import boto3
from io import BytesIO
from zipfile import ZipFile
from mimetypes import guess_type
import json


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:747462264644:DeployPortfolioTopic')

    location = {
        "bucketName": "portfoliobuild.currentlyunder.dev",
        "objectKey": "portfoliobuild.zip"
    }

    try:
        job = event.get("CodePipeline.job")

        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "BuildArtifact":
                    location = artifact["location"]["s3Location"]


        print("Building portfolio from: {}".format(location))

        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('portfolio.currentlyunder.dev')
        build_bucket = s3.Bucket(location["bucketName"])

        zipfile = BytesIO()

        build_bucket.download_fileobj(location["objectKey"], zipfile)

        with ZipFile(zipfile) as zf:
            for f in zf.namelist():
                content_type, _ = guess_type(f)

                obj = zf.open(f)
                portfolio_bucket.upload_fileobj(
                    obj, f,
                    ExtraArgs={
                        'ACL': 'public-read',
                        'ContentType': content_type
                    }
                )
    except:
        topic.publish(Subject="Portfolio deploy failed", Message="Portfolio was not deployed successfully.")
        raise


    if job:
        codepipeline = boto3.client("codepipeline")
        codepipeline.put_job_success_result(jobId=job["id"])

    topic.publish(Subject="Portfolio deployed", Message="The portfolio deployed successfully!")

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

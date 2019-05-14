import boto3
from io import BytesIO
from zipfile import ZipFile
from mimetypes import guess_type
import json


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:747462264644:DeployPortfolioTopic')

    try:
        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('portfolio.currentlyunder.dev')
        build_bucket = s3.Bucket('portfoliobuild.currentlyunder.dev')

        zipfile = BytesIO()

        build_bucket.download_fileobj('portfoliobuild.zip', zipfile)

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
    else:
        topic.publish(Subject="Portfolio deployed", Message="The portfolio deployed successfully!")

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

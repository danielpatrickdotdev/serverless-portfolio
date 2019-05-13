import boto3
from io import BytesIO
from zipfile import ZipFile
from mimetypes import guess_type

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

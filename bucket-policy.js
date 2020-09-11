{
  "Version":"2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": "logs:CreateLogGroup",
        "Resource": "arn:aws:logs::eu-west-2:108.....:*"
     },
    {
        "Effect": "Allow",
        "Action": [
            "logs:CreateLogStream",
               "logs:PutLogEvents"
        ],
        "Resource": [
            "arn:aws:logs::eu-west-2:108.....:log-group:.aws/lambda/S3Trigger*"
    },

    {
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "*"
     }
  ]
}

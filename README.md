# Lambda-S3-SNS-CloudWatch-Debugging

##AWS Lambda function:


###Lambda: 

**Event Trigger comes in &rarr; Lambda Service &rarr; Yes or No **

Yes &rarr; Use from pool of already running function containers

No &rarr; New function container created  &rarr; S3 Bucket with code
1.	 Code download
2.	Runtime env started (a.k.a., cold start)

•	FaaS – Function as a Service is a type of serverless, event-driven computing.

•	No containers or VMs are present and have to just focus on a code.

•	Supports blue/green deployments.

•	Bring your own code or language using lambda layers.


### Creation of Lambda function under Application layer:

**IAM Role + Code + Runtime Configuration = Lambda Function**

•	Lambda service required IAM role with specific permissions so it can query. It also need to reach out to AWS services through the code.
•	Requires attention to CloudWatch logs for log streaming.

#### Lambda Function creation:

AWS Management console &rarr Services &rarr `Lambda` &rarr Get Started (first time) or `Create a function` &rarr Create function.

•	May select which ever suits you, will select `Author from scratch` &rarr;
1.	Function name: `Lambda-function`
2.	Runtime: `Python3.8`
3.	`Permissions`: Execute role: `create a new role with basic Lambda permissions`
4.	Click on ‘create’

•	Function will be created and it might take few seconds. Should see all the options what we have selected, ‘executed role’ that Lambda has created. Memory settings by default it will be set to 128 MB. Setting through concurrency. Error handling through DLQ amazon SQS service and sending unhandled events to Dead letter queue DLQ. Enabling CloudTrail tracing all API calls.

•	Move to IAM service to see if the role has successfully created. 
1.	AWS Service &rarr; IAM &rarr; Roles &rarr; Lambda-function-role-xxx  &rarr; Permissions &rarr; under policy name &rarr; should the statement of the policy.
2.	Allows the function to create the log stream.

•	Moved to Lambda function service to perform steps. Visual presentation of the Lambda service page. Service which have access through Triggers.

### Integration with other services to invoke Lambda functions.

Function Code: 

1. Code entry type: Edit code inline
2. Runtime: `Python 3.8`
3. Handler: `Lambda_function.lambda_handler`
4. Pull the code from `Lambda_handler.py`


##### Creating the SNS topic for email notification:

AWS Console &rarr; Services &rarr; SNS &rarr; Topics 
Create a topic &rarr; S3TriggerTopic &rarr; This trigger will send out an email to my email address when event S3 triggers is received by the Lambda function.

•	Update the code under TopicArn from SNS Topic
 `TopicArn='<SNS-TOPIC-ARN>',`
`TopicArn= ‘arn:aws:sns:eu-west-2:108xxxxxxxx:S3TriggerTopic`

•	Once the code is updated please click on ‘Save’, has there were some changes made to the code.

##### follow the next steps to Add Trigger:

•	Click on `Add Trigger` and from drop down select S3.

•	Bucket select the `Lambda-S3-trigger-bucket` one created for SNS Topic.

•	Event Type: `PUT` basically for which a file & object is uploaded to the bucket, It will send out the email whenever the lambda function

•	Leave the fields `default` for `Prefix & Suffix` and Check `enable trigger`, then click on `Add`

•	S3 trigger will be created. by default, it will be enabled.

•	You may choose disable if lambda functions are not ready.

#### follow the next steps to Add another Trigger for S3 deleting files:

•	Click on `Add Trigger` and from drop down select S3.

•	Bucket select the Lambda-S3-trigger-bucket.

•	Event Type: `All Object delete events`

•	Leave the fields `default` for `Prefix & Suffix` and Check `enable trigger`, then click on `Add`

•	Trigger will be created.


#### Check the executed role, if required modify the role function can public for the topic is created.

•	Click on the link below `Execute Role` &rarr; ‘Existing role’ &rarr; view the ‘S3-Trigger-role’ on the IAM console.

•	It will take it to properties of IAM console &rarr; under `Permissions` &rarr; Policy name &rarr; Edit Policy &rarr; `JSON` tab. As per the previous policy created should see two stages.

•	follow the `bucket-policy.js` file.

•	Click on `Review policy` and Save changes.

#### Test the S3 Trigger and Lambda function is working.

•	Please check S3 bucket is empty before moving forward. 

•	Click on `upload`, file `index.html` may keep all properties everything else default and create the bucket. 

•	Wait for few seconds/minutes to see Lambda function and SNS topic is working has expected. 

•	Open the email a/c to see if there is a notification email with details in it. 

•	Try to delete the file from S3 bucket, has created a notification trigger for deletion. 

#### Code is working has expected.

Utilised the code to carry out few actions, once receive the event.
We were monitoring the events in S3 bucket and instructing lambda function to send out an email to detect the change in S3 bucket.


### Testing and debugging AWS Lambda functions:

In the cloud environment, AWS platform may select different ways to test and debug Lambda Function:
•	**AWS CloudTrail**: log API calls going in and out Lambda function.

•	**Amazon CloudWatch Logs**: have your lambda function send debug 0r execution logs result is success or failure and analyse it.

•	**Cloud9 IDE**: run and debug your code in a browser and includes a terminal.

•	**AWS X-Ray**: Allows to distributed application across AWS realm, check performance issue and error, which has a daemon which usually installs on VM’s however on Lambda is preinstalled. 

•	In Lambda AWS console directly with test JSON data.

•	**AWS SAM CLI**: Serverless Application Module, allows to run Lambda functions location and test by hitting events locally on machine integrated with CI/CD pipeline deployed in cloud.


#### Creating a Debugging Test function
AWS Console &rarr; Lambda &rarr; Debugging-Lambda-function &rarr; 
•	 Pull the code from `Lambda_handler.py`


##### Create a test Event’

•	Click on `Select a test event` allows you to send chucks of JSON data, actually S3 events will be sending to the function. This will invoke the function.

•	Should see `Event template` which are prepopulated and select `Amazon S3 Put` the trigger.

•	Name has `LambdaEvent` and create. This will be passed to def Lambda_handler of the Lambda function.

•	Click on `Test`. May check the succeeded logs.

 
•	If any error regarding the SNS publish, check the IAM policy: should be SNS:Publish policy entry is created.
Please follow the policy file `sns-policy.js`

`{

        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "*"
     }
  ]
}`



•	**CloudWatch** check the log stream, Debugging-Lambda-function, click on the event with latest time stamp to analyse the output. Function is successful.

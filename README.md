# [AWS](https://aws.amazon.com/) - Serverless API

Powered by the [Serverless Framework](https://serverless.com/). The most widely adopted tool kit for building serverless applications.
![serverless image](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+11.07.12+AM.png)

### Why go Serverless

Low **maintenance** required, you deal with your own application code and nothing else.
It’s **cheaper** to run serverless applications because you are effectively only paying per request. So when your application is not being used, you are not being charged for it. See more [HERE](https://aws.amazon.com/pricing/)
Finally, the ease of **scaling** is thanks in part to DynamoDB which gives us near infinite scale and Lambda that simply scales up to meet the demand.

Stay in touch on [**Slack**](https://join.slack.com/t/aws-meetup-group/shared_invite/enQtNTgzNTUzMjcxMjQ4LTA0OTBiYjU1MDM2N2RiYjZjMmFiNDBiMTNiNDliNGNiZGM4MGQ2ZTY1N2Y3ZDNkOTk3NGI5MTE1ZDFlYWE1ZmM) and tell us what you thought of the course [Here](https://goo.gl/forms/Z7Oas47v4kNHv4fy2)!

# Table of contents

- [Who is this for?](#who-is-this-for)
- [What does this cover?](#what-does-this-cover)
- [Requirements](#requirements)
- [Technologies and Services](#technologies-and-services)
- [How to get help? **Slack**](#how-to-get-help)
- [AWS Account Creation](#aws-account-creation)
- [Getting Setup with AWS Services](#getting-setup-with-aws-services)
  - [Create an IAM User](#create-an-iam-user)
  - [Install the AWS CLI](#install-the-aws-cli)
  - [Add Access Key to AWS CLI](#add-access-key-to-aws-cli)
  - [Create a DynamoDB Table](#create-a-dynamodb-table)
- [Building the API](#building-the-api)
  - [Install the Serverless Framework](#install-serverless-framework)
  - [Walk Through the Project](#walk-through-the-project)
    - [Running the API Locally](#running-the-api-locally)
    - [Deploying the API](#deploying-the-api)
- [FrontEnd Repo](https://github.com/austinloveless/aws-todo-client)
- [Building-From-Scratch](#building-from-scratch)
- [Extra Resources](#extra-resources)
- [Survey](https://goo.gl/forms/Z7Oas47v4kNHv4fy2)
- [Slides](https://docs.google.com/presentation/d/1xDhTM_H13d1nsyYmbI6NKyPfYRr_1Kfje0SjWlFVIUY/edit?usp=sharing)

# Who is this for?

This is meant for developers that would like to build serverless applications. Or for people who are looking to get more into infrastructor and the business side of cloud computing. It's meant to serve as a resource for learning about how to build and deploy serverless applications. Also this is catered solely towards JavaScript developers for now.

Let’s start by looking at what we’ll be covering.

# What does this cover?

This is a Serverless API for a Todo List written completely in JavaScript. It is a relatively simple application but I am going to address the following requirements.

### Basic CRUD Capability

- The ablility to Create Todos
- The ability to Get a list of all Todos.
- The ability to Get a Todo based on an id.
- The ability to Update a Todo based on an id.
- The ability to Delete a Todo based on an id.

![picture](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+10.35.40+AM.png)

[**End Product**](https://o53dtbkbf3.execute-api.us-east-1.amazonaws.com/prod/todos)

# Requirements

You will need [Node v8.10+](https://nodejs.org/en/). You also need to have basic knowledge of how to use the command line, Git/Github, and JavaScript.

# Technologies and Services

We’ll be using the following set of technologies and services to build our Serverless API.

- [API Gateway ](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [NodeJS](https://nodejs.org/en/)

# How to get help?

Join the Meetup slack workspace and post your question in the **aws-help** channel. [**Slack**](https://join.slack.com/t/aws-meetup-group/shared_invite/enQtNTgzNTUzMjcxMjQ4LTA0OTBiYjU1MDM2N2RiYjZjMmFiNDBiMTNiNDliNGNiZGM4MGQ2ZTY1N2Y3ZDNkOTk3NGI5MTE1ZDFlYWE1ZmM)

# AWS Account Creation

First let's get started by creating an AWS (Amazon Web Services) account. Of course you can skip this if you already have one. Head over to the [AWS homepage](https://aws.amazon.com/) and hit the Create a Free Account and follow the steps to create your account.

![aws homepage](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+11.01.41+AM.png)

Next let’s configure your account so it’s ready to be used.

# Getting Setup with AWS Services

### Create an IAM User

![iam image](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+10.59.46+AM.png)
[Amazon IAM](https://aws.amazon.com/iam/) (Identity and Access Management) enables you to manage users and user permissions in AWS. You can create one or more IAM users in your AWS account.

In this section, we are going to create a new IAM user for a couple of the AWS related tools we are going to be using later.

Follow the instructions for Creating an IAM user [HERE](http://blog.austincloveless.codes/create-an-aws-iam-user)

### Install the AWS CLI

To make it easier to work with a lot of the AWS services, we are going to use the AWS CLI.

The AWS CLI needs Python 2 version 2.6.5+ or Python 3 version 3.3+ and Pip. Use the following if you need help installing Python or Pip.

- [Installing Python](https://www.python.org/downloads/)
- [Installing Pip](https://pip.pypa.io/en/stable/installing/)

Now using Pip you can install the AWS CLI (on Linux, macOS, or Unix) by running:
`sudo pip install awscli`
Or using [Homebrew](https://brew.sh/) on macOS:
`brew install awscli`

If you are having some problems installing the AWS CLI or need Windows install instructions, refer to the AWS CLI install [instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

### Add Access Key to AWS CLI

We now need to tell the AWS CLI to use your Access Keys from the IAM section.
It should look something like this:
`Access key ID AKIAIODSFSFFBGDNN7EXAMPLE`
`Secret access key wJadsfXUtsfsI/K7MDENG/bPxRfiCYEXAMPLEKEY`

Just run the following command in your terminal and enter Access Key and your Secret Key ID when asked.
`aws configure`

For **Default region name** put `us-east-1` that is the Northern Virgina region, and leave the **Default output format** as is.

### Create a DynamoDB Table

![dynamodb image](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+11.03.29+AM.png)
To build our Todo API, it makes sense that we first start by thinking about how the data is going to be stored. We are going to use [DynamoDB](https://aws.amazon.com/dynamodb/) to do this.

Follow the instructions for Creating a DynamoDB Table [HERE](http://blog.austincloveless.codes/create-a-dynamo-table)

# Building the API

![lambda image](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+11.05.37+AM.png)
We are going to be using [AWS Lambda](https://aws.amazon.com/lambda/) and [Amazon API Gateway](https://aws.amazon.com/api-gateway/) to create our API. AWS Lambda is a compute service that lets you run code without provisioning or managing servers. API Gateway makes it easy for developers to create, publish, maintain, monitor, and secure APIs. We are going to use the [Serverless Framework](https://serverless.com/) to help us with it.

The Serverless Framework will enable us to deploy backend applications as independent functions that will be deployed to AWS Lambda. It also configures AWS Lambda to run code in response to HTTP requests using Amazon API Gateway.

### Install Serverless Framework

Run the following to globally install Serverless.
`npm install serverless -g`

### Walk Through the Project

**I already have the API built in this Respository so lets clone this repo and walk through it.**

- Clone this repository on your local machine. `git clone https://github.com/austinloveless/AWS-API-MU.git`
- Go into the directory that you just cloned. `cd AWS-API-MU`

**NOTE**
There are two branches a `master` branch and an `ES5` branch.
If you are a beginner I would look at the `ES5` branch.
**For ES5 Syntax**

- After cloning the repo and `cd` into it run the command `git checkout ES5`
- You should now be in the `ES5 branch` And can follow along from there.

### Running the API Locally

**In the Root of your Project**

- Run the command `npm install` to install the NodeJS packages
- Now In your project you should see a `Handlers` folder and a `Mocks` folder.
- The Handlers folder is where your functions are for the API.
- To **Test** the functions run the command `serverless invoke local --function <function name ex: createTodo> --path mocks/<mock name ex: createTodo-event.json>`
- This will run your function and pass in the json object to test the function.
- If functions pass you should get a `200 success code` with the response and if it fails you should get a `500 error code`.
- To test this locally with API Gateway check out [Serverless Offline](https://github.com/dherault/serverless-offline).
- **There are comments throughout the code explaining the logic**

### Deploying the API

**In the Root of your Project**

- Run the command `serverless deploy` to deploy your project
- Run the command `serverless deploy function --function <function name>` to deploy a single function
- You can see Serverless deployed a [Cloudformation Template](https://aws.amazon.com/cloudformation/) deploying your services onto AWS.
- Now in your AWS account you can go see the deployed Lambda functions and the API Gateway API.
- You should see something like this in your terminal

![deploy image](https://s3.amazonaws.com/aws-meetup-images/Screen+Shot+2019-03-23+at+11.13.33+AM.png)

# Building From Scratch

**Below is how to start the project from scratch and build your own API.**

- In your working directory create a project using a NodeJS starter.
  `serverless install --url https://github.com/AnomalyInnovations/serverless-nodejs-starter --name todo-app-api`
- Go into the directory for our API project.
  `cd todo-app-api`
- From here you can see the basic NodeJS starter template and start writing your own API.

# Extra Resources

- If you are looking to get a certification I would use [AcloudGuru](https://acloud.guru/).
  They have some of the best resources for getting a certification.
- If you are confused about a topic the [Docs](https://docs.aws.amazon.com/) can be a good place to find information.
- I would also highly recommend using the [AWS FAQs](https://aws.amazon.com/faqs/) for a quick answer to questions you may have.

# aws-todo-client

# Expense-ly Auto Expenser

## Overview

Using Microsoft Azure, AI / ML, Expense-ly hopes to expedite the expensing process for account managers and employees alike.

**For Employees trying to expense a trip's receipts:**

- Automatically collect and file an entire trip's receipts
- Introduce explainability to understand why an item wasn't approved
- Provide transparency in current expense case statuses

**For Account Managers reviewing expense reports:**

- Integrate AI to automate review receipts
- Specify company expensing policies during receipt reviews
- Reduce time and increase reliability for expense report reviews

## Architecture

![Archictecture](/readme-resources/Architecture.png)

**Cloud Architecture**

- Azure App Services: Scalable, containerised front-end
- Azure Functions: Serverless, polyglot FaaS backend with federated access management
- Bing Search API: REST-ful Image Search
- Azure Cognitive Services: Natural Language Understanding service for entity extraction
- Azure Form Recognizer: Managed Computer Vision service to extract data from images
- Azure Blob Storage: Scalable unstructured data storage for image data
- Azure Table Storage: Flexible NoSQL database

## Build and Run Frontend

```bash
cd expensely-frontend
yarn install
yarn start
```

## Backend Details (TODO)

## Related Resources

- [ZenHub board](https://app.zenhub.com/workspaces/expense-ly-5d5044f23cb7066481260b1d/board?repos=201786565) (invitation required)
- [Azure AI Hackathon](https://azureai.devpost.com)

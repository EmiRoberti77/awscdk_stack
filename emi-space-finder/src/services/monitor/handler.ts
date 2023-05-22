import { SNSEvent } from "aws-lambda";

const webhook = 'https://hooks.slack.com/services/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';

async function handler (event:SNSEvent, context:any){
  for(const record of event.Records){
    await fetch(webhook, {
      method:'POST',
      body:JSON.stringify({
        'text':`Huston we have a problem ${record.Sns.Message}`
      })
    })
  }
}

export { handler };
import {handler} from "../src/services/spaces/handler"

process.env.AWS_REGION = 'us-east-1'
process.env.TABLE_NAME = 'SpaceTable-0e18ddc4064f'

handler({
  httpMethod:'POST',
  body:JSON.stringify({
    location:'Trieste'
  })
}as any, {} as any).then((res)=>{
  console.log(res)
})
.catch((err)=>{
  console.log(err)
})
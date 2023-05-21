import { SpaceEntry } from "../model/model";
import { AuthService } from "./AuthService";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

//const spaceUrl = 'https://bo6fkr9tmh.execute-api.us-east-1.amazonaws.com/prod/' + 'spaces'

export class DataService {

  private spaceUrl = 'https://bo6fkr9tmh.execute-api.us-east-1.amazonaws.com/prod/spaces'
  private authService: AuthService;
  private s3Client: S3Client | undefined;
  private awsRegion: string = 'us-east-1';

  constructor(authService:AuthService){
    this.authService = authService;
  }

  public async getSpaces():Promise<SpaceEntry[]>{

    const result = await fetch(this.spaceUrl, {
      method:'GET',
      headers:{
        'Authorization': this.authService.jwtToken!
      }
    });

    const getSpacesResultJson = result.json();
    return getSpacesResultJson;
  }

  public reserveSpace(spaceId: string){
    return `space id ${spaceId}`;
  }

  public async createSpace(name:string, location:string, photo?:File){
    //const credentials = await this.authService.getTemporaryCredentials();
    const space = {} as any;
    space.name = name;
    space.location = location;

 
    if(photo){
      const uploadUrl = await this.uploadPublicFile(photo);
      console.log('uploaded photo', uploadUrl);
      space.spaceUrl = uploadUrl;
    }

    console.log('jwtToken in createSpace => ', this.authService.jwtToken!)
    
    const postResult = await fetch(this.spaceUrl, {
      method:'POST',
      body:JSON.stringify(space),
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.jwtToken!}`,
      }
    });

    return (await postResult.json()).id
  }

  private async uploadPublicFile(file:File){
    const credentials = await this.authService.getTemporaryCredentials();
    if(!this.s3Client){
      this.s3Client = new S3Client({
        credentials: credentials as any,
        region: this.awsRegion
      });
    }

    const command = new PutObjectCommand({
      Bucket: 'space-finder-photos-1245202c105f',
      Key: file.name,
      ACL: 'public-read',
      Body: file
    })

    await this.s3Client.send(command);
    return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
  }

  public isAuthorized(){
    return this.authService.isAuthorized();
  }
}
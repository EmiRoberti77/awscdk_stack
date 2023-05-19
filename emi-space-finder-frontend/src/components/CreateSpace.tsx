import React, {SyntheticEvent, useState} from 'react'
import { DataService } from '../service/DataService'
import { consumers } from 'stream';
import { NavLink } from 'react-router-dom';

const MISSING_PARAMS = 'Missing one of the following parameters: name, location or photo';
const SUCCESS = (id:string) => `Successfully created space ${id}`;
const EMPTY = '';

interface CreateSpaceProps {
  dataService:DataService;
};

const CreateSpace:React.FC<CreateSpaceProps>= ({dataService}) => {

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [photo, setPhoto] = useState<File | undefined>();
  const [actionResult, setActionResult] = useState<string>('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if(name && location){
      const id = await dataService.createSpace(name, location, photo)
      setActionResult(SUCCESS(id));
      setName(EMPTY);
      setLocation(EMPTY);
    } else {
      setActionResult(MISSING_PARAMS)
    }
  }

  const setPhotoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      console.log('filname', e.target.value);
      console.log('photo', e.target.files[0])
      setPhoto(e.target.files[0])
    }
  }

  const renderPhoto = () =>{
    if(photo){
      console.log(photo)
      const locationUrl = URL.createObjectURL(photo);
      console.log('locationUrl', locationUrl);
      const imageElement = document.querySelector('img');
      if(imageElement){
        imageElement.src = locationUrl
      }
      return (
        <>        
          <p>{locationUrl}</p>
          <img src={locationUrl} alt={'image preview'} style={{maxWidth:'200px'}}/>
        </>
      )
    }
  }

  const renderForm = () => {
    if(!dataService.isAuthorized){
      return (
        <NavLink to={'/login'} >Please Login</NavLink>
      )
    }

    return (
      <form onSubmit={(e) => handleSubmit(e)}>
          <label>Name:</label><br/>
          <input value={name} onChange={(e) => setName(e.target.value)} /><br/>
          <label>Location:</label><br/>
          <input value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
          <label>Photo:</label><br/>
          <input type="file" onChange={(e) => setPhotoUrl(e)} /><br/>
          {renderPhoto()}<br/>
          <input type="submit" value='Create space'/>
        </form>
    )
  };

  return (
    <div>
      {renderForm()}
      {actionResult ? <h3>{actionResult}</h3> : undefined}
    </div>
  )
}

export default CreateSpace
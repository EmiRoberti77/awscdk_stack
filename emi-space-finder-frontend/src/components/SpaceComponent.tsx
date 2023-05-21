import React from 'react'
import { SpaceEntry } from '../model/model';
import './SpaceComponent.css';


interface SpaceComponentProps extends SpaceEntry {
  reserveSpace:(spaceId:string, spaceName:string) => void;
}

const SpaceComponent:React.FC<SpaceComponentProps> = (props:SpaceComponentProps) => {


  const renderImage = () => {
    if(props.photoUrl){
      return <img src={props.photoUrl}/>;
    } else {
      return <img src='https://my.alfred.edu/zoom/_images/fall-drone-shot-thumbnail.jpg'/>;
    }
  }

  return (
    <div className='spaceComponent'>
      {renderImage()}
      <label className='name'>{props.name}</label>
      <br/>
      <label className='location'>{props.location}</label>
      <br />
      <button onClick={()=>props.reserveSpace(props.id, props.name)}>Reserve</button>
    </div>
  )
}

export default SpaceComponent
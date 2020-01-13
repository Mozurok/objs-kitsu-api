import React, { Component } from 'react';
import axios from "axios";
import LoadingSpin from "../LoadingSpin";
import ListMedia from "../ListMedia";
import history from "../../helpers/history";
import './styles.css'
import imgNotFound from '../ListCard/image-not-found.png';

class CharacterDetails extends Component {
  state = {
    medias: [],
    totalMedia: 0,
    countMedia: 0,
    loading: true,
    nameCharacter: '',
    avatarImg: '',
  }
  componentDidMount(){
    if(this.props.location.state){
      axios.get(`${this.props.location.state.medias}`)
        .then((res) => {
          const totalMedia = res.data.meta.count;
          this.setState({
            totalMedia,
          })
          const data = res.data.data;
          if(data.length > 0){
            data.forEach(a => {
              this.getMedias(a.relationships.media.links.related);
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.get(`https://kitsu.io/api/edge/characters/${1}`)
        .then((resUser) => {
          console.log(resUser)
          const data = resUser.data.data;
          this.setState({
            nameCharacter: data.attributes.name,
            avatarImg: data.attributes.image.original,
          })
          axios.get(`${data.relationships.mediaCharacters.links.related}`)
            .then((res) => {
              const totalMedia = res.data.meta.count;
              this.setState({
                totalMedia,
              })
              const data = res.data.data;
              if(data.length > 0){
                data.forEach(a => {
                  this.getMedias(a.relationships.media.links.related);
                })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getMedias = (url) => {
    axios.get(`${url}`)
      .then((res) => {
        this.setState((state) => {
          return {
            medias: [...state.medias, res.data.data],
            countMedia: state.countMedia + 1,
          };
        });
        const {countMedia, totalMedia} = this.state;
        if(countMedia === totalMedia){
          this.setState({
            loading: false,
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        })
        console.log(error);
      });
  }

  render() {
    let {nameCharacter, avatarImg } = this.state;
    if(this.props.location.state){
      nameCharacter = this.props.location.state.name;
      avatarImg = this.props.location.state.avatar;
    }
    return (
      <div className={'listContainer'}>
        <div onClick={() => {
          history.goBack();
        }}>
          <span className={'backButtonMedia'}>&larr; Voltar</span>
        </div>
        <div className={'charInfo'}>
          <img className={'avatarChar'} alt={nameCharacter} src={avatarImg ? avatarImg : imgNotFound} />
          <h2>{nameCharacter}</h2>
        </div>

        {
          this.state.loading ?
            (
              <div>
                <h3>Medias</h3>
                <LoadingSpin/>
              </div>
            ) :
            (
              <div>
                <h3>Medias</h3>
                {this.state.medias.map(a =>
                  (
                    <ListMedia key={a.id} data={a} />
                  )
                )}
              </div>
            )
        }
      </div>
    );
  }
}

export default CharacterDetails;

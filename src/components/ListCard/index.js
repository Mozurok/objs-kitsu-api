import React, {Component} from 'react';
import './styles.css'
import imgNotFound from './image-not-found.png';
import history from "../../helpers/history";

class ListCard extends Component {
  seeDetatils = (infos) => {
    history.push({
      pathname: `/details/${infos.id}/${infos.attributes.slug}/`,
      state: {
        medias: infos.relationships.mediaCharacters.links.related,
        avatar: infos.attributes.image ? infos.attributes.image.original : null,
        name: infos.attributes.name
      }
    });
  }

  createMarkup(text, length) {
    if (length > 200) {
      return {__html: `${text}...`};
    }
    if (length === 0) {
      return {__html: '*Não possui descrição cadastrada*'};
    }
    return {__html: text};
  }

  render() {
    const {data} = this.props;
    return (
      <div className={'listItems'} key={data.id} onClick={() => {this.seeDetatils(data)}}>
        <div className={'firstItem'}>
          <div className={'divAvatar'}>
              <img className={'avatarImg'} src={data.attributes.image ? data.attributes.image.original : imgNotFound} alt={'Avatar'}/>
            <div className={'avatarName'}>{data.attributes.name}</div>
          </div>
        </div>
        <div className={'secondItem'}
             dangerouslySetInnerHTML={this.createMarkup(data.attributes.description.slice(0, 200), data.attributes.description.length)}/>
      </div>
    );
  }
}

export default ListCard;

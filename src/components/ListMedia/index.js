import React, {Component} from 'react';
import './styles.css'
import imgNotFound from '../ListCard/image-not-found.png';

class ListMedia extends Component {
  createMarkup(text, length) {
    if (length > 200) {
      return {__html: `${text}...`};
    }
    if (length === 0) {
      return {__html: '*Não possui sinopse cadastrada*'};
    }
    return {__html: text};
  }

  render() {
    const {data} = this.props;
    return (
      <div className={'listItemsMedia'} key={data.id}>
        <div className={'firstItem'}>
          <div className={'divAvatar'}>
            {data.attributes.posterImage.original ? (
              <img className={'mediaImg'} src={data.attributes.posterImage.original} alt={'Avatar'}/>
            ) : (
              <img className={'mediaImg'} src={imgNotFound} alt={'Avatar'}/>
            )}
            <div className={'avatarName'}>
              <strong>{data.attributes.canonicalTitle}</strong>
            </div>
          </div>
        </div>
        <div className={'secondItem'}
             dangerouslySetInnerHTML={this.createMarkup(data.attributes.synopsis.slice(0, 200), data.attributes.synopsis.length)}/>
      </div>
    );
  }
}

export default ListMedia;

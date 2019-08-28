import React, {Component} from 'react';
import './styles.css'
import {connect} from "react-redux";
import loaderSpin from './loader.png';
import imgNotFound from './image-not-found.png'
import {handlerGetCharacterByName, handlerGetInitialList} from "../../actions/kitsu";
import {DebounceInput} from "react-debounce-input";
import history from "../../helpers/history";

class CharacterList extends Component {
  state = {
    txtSearch: this.props.match.params.text || '',
    typed: false,
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.match.params.text) {
      this.props.handlerGetCharacterByName({name: this.props.match.params.text, number: this.props.match.params.number || 0});
    } else {
      this.props.handlerGetInitialList(this.props.match.params.number || 0)
    }
  }

  searchUserHandler = (txt) => {
    this.setState({
      txtSearch: txt,
    })
    if (txt === '') {
      this.props.handlerGetInitialList(0);
      history.push('/');
    } else {
      this.props.handlerGetCharacterByName({name: txt, number: 0});
      history.push(`/search/${txt}`);
    }
  }
  changePagination = (number = null, txt = null, action = null) => {
    console.log(number, txt, action)
    if(number && !txt && !action){
      if(number === 1){
        this.props.handlerGetInitialList(0);
        history.push('/');
      } else {
        this.props.handlerGetInitialList(number);
        history.push(`/page/${number}`);
      }
    }
    if(number && !txt && action){
      if(action === 'next'){
        this.props.handlerGetInitialList(parseInt(number) + 1);
        history.push(`/page/${parseInt(number) + 1}`);
      } else {
        if((parseInt(number) - 1) === 1){
          this.props.handlerGetInitialList(0);
          history.push('/');
        } else {
          this.props.handlerGetInitialList(parseInt(number) - 1);
          history.push(`/page/${parseInt(number) - 1}`);
        }
      }
    }
    if(number && txt && !action){
      if(number === 1){
        this.props.handlerGetCharacterByName({name: txt, number: 0});
        history.push(`/search/${txt}`);
      } else {
        this.props.handlerGetCharacterByName({name: txt, number: number});
        history.push(`/search/${txt}/page/${number}`);
      }
    }
    if(number && txt && action){
      if(action === 'next'){
        this.props.handlerGetCharacterByName({name: txt, number: parseInt(number) + 1});
        history.push(`/search/${txt}/page/${parseInt(number) + 1}`);
      } else {
        if((parseInt(number) - 1) === 1){
          this.props.handlerGetCharacterByName({name: txt, number: 0});
          history.push(`/search/${txt}`);
        } else {
          this.props.handlerGetCharacterByName({name: txt, number: parseInt(number) - 1});
          history.push(`/search/${txt}/page/${parseInt(number) - 1}`);
        }
      }
    }
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
    let pages = [
      {number: 1, onlyLg: false},
      {number: 2, onlyLg: false},
      {number: 3, onlyLg: false},
      {number: 4, onlyLg: true},
      {number: 5, onlyLg: true},
      {number: 6, onlyLg: true}
    ];
    const {kitsu} = this.props;
    if(kitsu.pagCount > 0){
      pages = [
        {number: 1, onlyLg: false},
        {number: 2, onlyLg: false},
        {number: 3, onlyLg: false},
        {number: 4, onlyLg: true},
        {number: 5, onlyLg: true},
        {number: 6, onlyLg: true}
      ];
      if(this.props.match.params.number && this.props.match.params.number !== 1){
        const plus = this.props.match.params.number;
        pages = [
          {number: 1 + (plus - 1), onlyLg: false},
          {number: 2 + (plus - 1), onlyLg: false},
          {number: 3 + (plus - 1), onlyLg: false},
          {number: 4 + (plus - 1), onlyLg: true},
          {number: 5 + (plus - 1), onlyLg: true},
          {number: 6 + (plus - 1), onlyLg: true}
        ];
      }
    }
    return (
      <div>
        <div className={'divSearchInput'}>
          <label className={'labelSearch'} htmlFor={'search-personagem'}>Nome do Personagem</label>
          <DebounceInput
            className={'inputSearch'}
            id={'search-personagem'}
            minLength={1}
            value={this.state.txtSearch}
            debounceTimeout={500}
            onChange={event => this.searchUserHandler(event.target.value)}/>
        </div>
        <div className={'listContainer'}>
          <div className={'listHeader'}>
            <div className={'firstHeader'}>Personagem</div>
            <div className={'secondHeader'}>Descricao</div>
          </div>
          {kitsu.loading ? (
            <div style={{width: '100%', textAlign: 'center'}}><img className={'imgSpinLoader'} src={loaderSpin}
                                                                   alt={'loader spin'}/></div>
          ) : (
            <React.Fragment>
              {kitsu.characters.length === 0 && !kitsu.loading && (
                <div style={{width: '100%', textAlign: 'center', marginTop: 32, marginBottom: 32}}><span
                  style={{fontSize: 24}}>Nenhum resultado encontrado para "<strong>{this.state.txtSearch}</strong>"</span>
                </div>
              )}
            </React.Fragment>
          )}
          {kitsu.characters.map(a => (
            <div className={'listItems'} key={a.id}>
              <div className={'firstItem'}>
                <div className={'divAvatar'}>
                  {a.attributes.image ? (
                    <img className={'avatarImg'} src={a.attributes.image.original} alt={'Avatar'}/>
                  ) : (
                    <img className={'avatarImg'} src={imgNotFound} alt={'Avatar'}/>
                  )}
                  <div className={'avatarName'}>{a.attributes.name}</div>
                </div>
              </div>
              <div className={'secondItem'}
                   dangerouslySetInnerHTML={this.createMarkup(a.attributes.description.slice(0, 200), a.attributes.description.length)}/>
            </div>
          ))}
        </div>
        <div className={'paginationContainer'}>
          <ul className={'paginationUl'}>
            {this.props.match.params.number === 1 || !this.props.match.params.number ? (
              <li
                className={'paginationLiBack paginationLiBackDisabled'}/>
            ) : (
              <li
                onClick={() => this.changePagination(this.props.match.params.number, this.props.match.params.text, 'back')}
                className={'paginationLiBack'}/>
            )}
            {pages.map(a => (
              <React.Fragment key={a.number}>
                {a.onlyLg ? (
                  <li
                    onClick={() => this.changePagination(a.number, this.props.match.params.text)}
                    className={a.number === parseInt(this.props.match.params.number) ?
                      ('paginationLiItem paginationHover only-lg paginationLiItemActive') :
                      ('paginationLiItem paginationHover only-lg')
                    }>
                    {a.number}
                  </li>
                ) : (
                  <li
                    onClick={() => this.changePagination(a.number, this.props.match.params.text)}
                    className={a.number === parseInt(this.props.match.params.number) || (a.number === 1 && !this.props.match.params.number) ?
                      ('paginationLiItem paginationHover paginationLiItemActive') :
                      ('paginationLiItem paginationHover')
                    }>
                    {a.number}
                  </li>
                )}
              </React.Fragment>
            ))}
            <li
              onClick={() => this.changePagination(this.props.match.params.number || 1, this.props.match.params.text, 'next')}
              className={'paginationLiNext'}/>
          </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlerGetInitialList: (e) => dispatch(handlerGetInitialList(e)),
    handlerGetCharacterByName: (e) => dispatch(handlerGetCharacterByName(e)),
  }
}

function mapStateToProps({kitsu}) {

  return {
    kitsu,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);

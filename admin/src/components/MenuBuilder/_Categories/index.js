import React from 'react';
import { SmallDescription } from '../styles';
import { Category } from './styles';
import Panel from '../_Panel';
import EditModal from './EditModal/Container';

export default class Categories extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  renderCategory = ({ name, productCount }) => (
    <div>
      <div>{name}</div>
      <SmallDescription>{productCount} produse</SmallDescription>
    </div>
  );

  render() {
    return null;
    return (
      <Panel
        title="Categorii"
        items={this.props.categories}
        createItem={this.props.createCategory}
        renderItem={this.renderCategory}
        type="categorie"
        loading={this.props.loading}
        saveItemEdits={this.props.editCategory}
        removeItem={this.props.removeCategory}
        moveItem={this.props.moveCategory}
        ItemStyle={Category}
        EditModal={EditModal}
      />
    );
  }
}

export const categories = [
  { index: 1, id: 10, name: 'Aperitive', productCount: 43 },
  { index: 2, id: 11, name: 'Supe', productCount: 13 },
  { index: 3, id: 13, name: 'Fel principal', productCount: 6 },
  { index: 4, id: 14, name: 'Grill - Cârnați', productCount: 42 },
  { index: 5, id: 15, name: 'Paste făcute în casă', productCount: 43 },
  { index: 6, id: 16, name: 'Garnituri', productCount: 11 },
  { index: 7, id: 17, name: 'Salate', productCount: 43 },
  { index: 8, id: 18, name: 'Desert', productCount: 7 },
  { index: 9, id: 19, name: 'Sosuri', productCount: 43 },
];
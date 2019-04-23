import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';
import { fetchMenuItems, onMenuItemSelect } from '../../actions';

class Menu extends React.Component {

    componentDidMount() {
        this.props.fetchMenuItems();
    }

    renderMenu() {
        return this.props.choices.map((choice) => {
            return (
                <MenuItem choice={choice} onClick={() => this.state.onMenuItemSelect(choice)} />
            );
        });
    }

    render() {
        return (
            <div className="ui simple sidebar inverted vertical menu left uncover visible">
                {this.renderMenu()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        choices: Object.values(state.choices),
    };
};

export default connect(mapStateToProps, {onMenuItemSelect, fetchMenuItems})(Menu);
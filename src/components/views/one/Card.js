
// Evolutility-UI-React :: /views/one/Card.js

// Single card (usually part of a set of Cards)

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types';

import models from '../../../models/all_models'
import format from '../../../utils/format'
import { fieldTypes as ft } from '../../../utils/dico'
import { Link } from 'react-router-dom'

export default class Card extends React.PureComponent {

    viewId = 'card'

    render() {
        const d = this.props.data || {},
            fields = this.props.fields || [],
            entity = this.props.entity,
            m = models[entity],
            link = '/'+entity+'/'+m.defaultViewOne+'/',
            icon = m.icon ? <img className="evol-many-icon" src={'/pix/'+m.icon} alt=""/> : null

        return (
            <div className="panel panel-default"> 
                {fields.map(function(f, idx){
                    const attr = (f.type===ft.lov) ? f.id+'_txt' : f.id,
                        fv = format.fieldValue(f, d[attr])

                    if(idx===0){
                        return (
                            <div key={idx}>
                                <h4><Link key={f.id} to={link+d.id}>{icon}{fv}</Link></h4>
                            </div>
                        )
                    }else if(f.type===ft.image){
                        return <div key={idx} className="card-fld-center"><Link key={f.id} to={link+d.id}>{fv}</Link></div>
                    }else{
                        return (
                            <div key={idx}>
                                <label>{f.label}: </label>
                                <div>
                                    {(f.type===ft.lov && f.lovicon) 
                                        ?  <img src={'/pix/'+d[f.id+'_icon']} className="lovIcon" alt=""/>
                                         : ' '
                                    }
                                    {fv}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

}

Card.propTypes = {
    entity: PropTypes.string.isRequired,
    fields: PropTypes.array,
    data: PropTypes.object
}
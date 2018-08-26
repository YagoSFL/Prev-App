import React from 'react'

export default props => (
    <input {...props.input} className='form-control'
        placeholder={props.plaholder} readOnly={props.readOnly}
        type={props.type} disabled={props.disabled} />
)
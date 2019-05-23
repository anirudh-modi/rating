import React from 'react';

export default class ModalForm extends React.Component {
    constructor(props){
        super(props);
        this.onPositiveClick=this.onPositiveClick.bind(this);
    }
    
    onPositiveClick(e){
		e.preventDefault();
		const email = e.target[0].value,
			title=e.target[1].value,
            description=e.target[2].value,
            star=e.target[3].value;

        if(!email || !star){
            alert('kindly enter email and star')
        }
        else {
            e.target.reset();
            this.props.onPositiveClick({
                user_email:email,
                title,
                description,
                star
            })
        }
    }
    
    render() {
        const {show, name}=this.props;
        return(
            <div className={show ? 'modal-container' : 'modal-container hidden'}>
                <div className='modal-content-loader'>
                    <div className='modal-header'>
                        Rate Product
                    </div>
                    <div className='modal-body'>
                        <form  onSubmit={this.onPositiveClick} encType="multipart/form-data">
                            Rate for {name}
                            <br></br>
                            email: <input name='email' type='text'/>
                            <br></br>
                            title: <input name='title' type='text' required/>
                            <br></br>
                            description: <textarea name='description' type='text'/>
                            <br></br>
                            How many star would you give? <select>
                                <option value=''>select stars to give</option>
                                <option value='1'>1 Star</option>
                                <option value='2'>2 Star</option>
                                <option value='3'>3 Star</option>
                                <option value='4'>4 Star</option>
                                <option value='5'>5 Star</option>
                            </select>
                            <div>
                                <button onClick={this.props.closeModal} type='button' className='reject'>Cancel</button>
                                <button type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
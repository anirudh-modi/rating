import React from 'react';
import axios from 'axios';
import ModalForm from '../components/modal';

function Rating(rating){
    const {title,description,star,user_email:userEmail}=rating;
    return (
        <div className='rating-container'>
            <div className='product-header'>
                <div>
                    {title}
                    <div className='product-subheader'>
                        by {userEmail}
                    </div>
                </div>
                <div>
                    {star}
                </div>
            </div>
            <div className='product-body'>
                {description}
            </div>
        </div>
    )
}
export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product:null,
            show:false
        }
        this.showRatingForm=this.showRatingForm.bind(this);
        this.handleRatingSubmit=this.handleRatingSubmit.bind(this);
    }

    componentWillMount() {
        fetch('/api/products/'+this.props.match.params.id,
            {
                method:'GET'
            })
            .then(response=>response.json())
            .then(response=>{
                this.setState({
                    product:response
                })
            })
            .catch(err=>console.error(err));
    }

    showRatingForm(){
        this.setState({show:true})
    }

    closeRatingForm(){
        this.setState({show:false})
    }

    handleRatingSubmit(ratingData){
        fetch(`/api/products/${this.props.match.params.id}/rating`,
            {
                method:'PUT',
                body:JSON.stringify(ratingData),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(function(response) {
                this.setState({
                    product:response
                })
            }.bind(this))
            .catch(err=>console.error(err))
            .then(()=>{
                this.closeRatingForm();
            })
    }

    render(){
        const {product,show} =this.state;

        if(product) {
            var {id,description,Ratings,company,title}=product;
        }

        return (
            <>
                <ModalForm 
                    name={title}
                    show={show}
                    onPositiveClick={this.handleRatingSubmit}
                    closeModal={this.closeRatingForm}
                />
                <div className='product-detail'>
                    {
                        product
                            ? (
                                    <div to={`/products/${id}`} className='product-container' key={id}>
                                        <div className='product-header'>
                                            <div>
                                                {title.toUpperCase()}
                                                <div className='product-subheader'>
                                                    {company.toUpperCase()}
                                                </div>
                                            </div>
                                            <button onClick={this.showRatingForm}>Add Rating</button>
                                        </div>
                                        <div className='product-body'>
                                            <div>
                                                <div className='description'>Description</div>
                                                {description}
                                            </div>
                                            <div>
                                                <div className='description'>
                                                    Ratings - {
                                                    Ratings.length
                                                        ?
                                                            (Ratings
                                                                .reduce((initValue,currValue)=>(initValue + parseInt(currValue.star)),0)/Ratings.length)
                                                                .toFixed(2)
                                                        : '-'
                                                }
                                                <div>
                                                    {
                                                        Ratings.map(Rating)
                                                    }
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )
                            : 'Product Not Found!!'
                    }
                </div>
            </>
        )
    }
}
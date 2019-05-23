import React from 'react';
import {Link} from 'react-router-dom';

export default class Products extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }
    componentWillMount() {
        fetch('/api/products',
            {
                method:'GET'
            })
            .then(response=>response.json())
            .then(response=>{
                this.setState({
                    products:response
                })
            })
            .catch(err=>console.error(err));
    }
    render(){
        return (
            <div className='product-list'>
                {
                    this.state.products.map(product=>{
                        const {id,title,description,company}=product;
                        return (
                            <Link to={`/products/${id}`} className='product-container' key={id}>
                                <div className='product-header'>
                                    <div>
                                        {title.toUpperCase()}
                                        <div className='product-subheader'>
                                            {company.toUpperCase()}
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            product.Ratings.length
                                                ?
                                                    (product.Ratings.reduce((initValue,currValue)=>(initValue + parseInt(currValue.star)),0)/product.Ratings.length)
                                                    .toFixed(2)
                                                : '-'
                                        }
                                    </div>
                                </div>
                                <div className='product-body'>
                                    <div className='description'>Description</div>
                                    {description}
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        )
    }
}
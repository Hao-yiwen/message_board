import React,{Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component{
    render(){
        return(
            <div>
                <CommentInput></CommentInput>
                <CommentList></CommentList>
            </div>
        )
    }
}

export default CommentApp
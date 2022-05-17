// imports
// deleteComment from CommentManager.js

import { ButtonControls } from "../buttonControls/ButtonControls"
import { Settings } from "../utils/Settings"
import { deleteComment } from "./CommentManager"


// export single comment component
export const Comment = ({ postId, commentObject, currentAuthor, getComments, lastComment }) => {
    // currentAuthor should be boolean defined where Comment component is invoked
    // true if the current user is the comment's author
    // in JSX, delete comment button is then displayed

    // function for deleteComment
    // takes parameter of comment's id
    // calls deleteComment from CommentManager
    // refresh list
    const removeComment = (commentId) => {
        deleteComment(commentId)
            .then(() => getComments(postId))
    }
    const dateFormat = (obj) => {
        const copy = {...obj }
        const dateArray = copy.created_on.split('-')
        const dayArray = dateArray[2].split('T')
        const newDate = `${dateArray[1]}-${dayArray[0]}-${dateArray[0]}`
        return newDate
    }
    return <div className="comment" >
        {/*
                JSX for comment
                should have
                    content
                    author
                deleteComment displayed if comment author is current user
            */}
        <div>{commentObject.content}</div>
        <div>{commentObject.author.user.username}</div>
        <div>{dateFormat(commentObject)}</div>
        {
            currentAuthor
                ? <div>
                    <ButtonControls
                        isPost={false}
                        postId={postId}
                        commentId={commentObject.id}
                        getComments={getComments} />
                </div>
                : null
        }
        {
            postId != lastComment ?
             <hr></hr>
            : ""
        }
    </div>
}
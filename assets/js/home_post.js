{
    const createPost = () => {
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    $('#posts-display-container').append(newPost(data.data.post));
                    
                    console.log($('textarea').val(''));
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        })
    }

    const newPost = (i) =>{
        return(
            `
            <div class="card shadow-sm p-3 mb-2 bg-body rounded card-body-container">
                <div class="card-body" id="comments-container">
                    <div id="comments-writer">
                        <div id="avtar-post">
                            <img src="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?ezimgfmt=rs:256x256/rscb2/ng:webp/ngcb2">
                        </div>
                        <div id="writers-name">
                            ${i.name}
                        </div>
                        <div id="modification-tab">
                            <a href="" style=" font-size: large; margin-right: 10px;">🖊</a>
                            <a href="/post/destroy/${i.id}" style="font-size: medium;">🗑</a>
                        </div>
                    </div>
                    <div id="comments-body">
                        ${i.comment}
                    </div>
                </div>
                <div id="container-for-comments">
                    <!-- ------------------------------------------------form for comment of a post ------------------------------------------------------------- -->
                    <div id="posts-container">
                            <form action="/comment/create" method="post">
                                <input class="form-control form-control-sm" id="comment-on-post" type="text" name="comment" placeholder="Type heare to add coment...">
                                <input id="hidden-input" type="hidden" name="post" value="${i.id}">
                                <button type="submit" class="btn btn-dark">Comment</button>
                            </form>
                    </div>
                    <!-- ---------------------------------------------------------------------------------------------------------------------------------------- -->                
                </div>
                </div>   
            `
        )
    }

    const but = document.getElementsByClassName('.commentButtonToComent');
    but.addEventListner('click',(e)=>{
        e.preventDefault();
    })

    createPost();
}
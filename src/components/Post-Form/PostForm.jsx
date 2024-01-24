import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select, } from '..'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({post}) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post ?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.id : undefined,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
           
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userID: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLocaleLowerCase()
            .replace(/^[a-zA-Z\d\s]/g,'-')
            .replace(/\s/g, '-')

           
        } 
        return ''
    }, [])

React.useEffect(() => {
    const subcription = watch((value, {name})=>{
        if(name === 'title'){
            setValue('slug', slugTransform(value.title,
                {shouldValidate: true}))
        }
    })

    return () =>{
        subcription.unsubscribe()
    }
}, [watch, slugTransform, setValue])

  return (
    <div>
        <form action="" onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                label='Title:'
                palceholder='Title'
                className='mb-4'
                {...register('title', {required:true})} ></Input>
                <Input 
                label='Slug:'
                palceholder='Slug'
                className='mb-4'
                {...register('slug', slugTransform(e.currentTarget.value),{shouldValidate: true})} ></Input>
                <RTE label='Content:' name='content' control={control} defaultValues={getValues('content')} />
            </div>
            <div className='w-1/3 px-2'>
                <Input 
                label='Featured Image:'
                type='file'
                className='mb-4'
                accept='image/png, image/jpg, image/jpeg, image/gif' />

                {post && (
                    <div className='w-full mb-4'>
                        <img 
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-lg'></img>
                    </div>
                )}
                 <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm
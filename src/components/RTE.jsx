import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form';

const RTE = ({name, control, label, defualtValue = ''}) => {
  return (
    <div className='w-full'>
        <Editor
          initialValue='default value'
          init={
              {branding: false,
              height: 500,
              menubar: true,
              plugins: [],
              toolbar: ''
          }
          }>
        </Editor>

        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
          <Editor
          initialValue={defualtValue}
          init={{}}>

          </Editor>
        )} />
    </div>
  )
}

export default RTE
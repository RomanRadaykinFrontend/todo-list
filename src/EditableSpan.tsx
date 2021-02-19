import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void
}



const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan render')

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false)
        if(title.trim()){
            props.changeTitle(title)
        }
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return(
        editMode ?
            <TextField onBlur={offEditMode}
                       autoFocus
                       value={title}
                       onChange={changeTitle}/>
            /*<input onBlur={offEditMode} autoFocus value={title} onChange={changeTitle}/>*/
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})


export default EditableSpan
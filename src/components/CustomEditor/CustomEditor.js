import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CustomEditor = ({ onChange, initialValue }) => {
    const editorRef = useRef(null);
    const [isEditorReady, setIsEditorReady] = useState(false);

    const handleEditorChange = (content) => {
        onChange(content);
    };

    const handleInit = (evt, editor) => {
        editorRef.current = editor;
        setIsEditorReady(true);
    };

    useEffect(() => {
        if (editorRef.current && isEditorReady) {
            editorRef.current.setContent(initialValue, { format: 'html' });
        }
    }, [initialValue, isEditorReady]);

    return (
        <Editor
            apiKey={process.env.REACT_APP_TINY_MCE}
            init={{
                plugins:
                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
                language: 'vi',
                ai_request: (request, respondWith) =>
                    respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
            initialValue=""
            onInit={handleInit}
            onChange={(e) => handleEditorChange(e.target.getContent())}
        />
    );
};

export default CustomEditor;

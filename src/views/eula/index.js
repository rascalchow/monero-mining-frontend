import { useState, useEffect } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Alert,
  Button,
} from 'reactstrap'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useProfileInfoCtx } from '@context/user/profileInfoContext'

const UpdateEula = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { eulaInfo } = useProfileInfoCtx()

  const onUpldateClick = () => {
    eulaInfo.updateEula(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }
  useEffect(() => {
    eulaInfo.loadEula();
  }, [])

  useEffect(() => {
    if (eulaInfo.eula) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(eulaInfo.eula.eula)),
        ),
      )
    }
  }, [eulaInfo.eula])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">EULA</CardTitle>
      </CardHeader>
      <CardBody>
        {eulaInfo.loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner className="spinner" />
          </div>
        ) : eulaInfo.error ? (
          <div className="d-flex justify-content-center py-5">
            <Alert color="danger">{eulaInfo.error}</Alert>
          </div>
        ) : (
          <>
            <Editor
              editorState={editorState}
              onEditorStateChange={(es) => {
                setEditorState(es)
              }}
            />
            <div className="mt-2 d-flex justify-content-end">
              <Button.Ripple color="primary" onClick={onUpldateClick}>
                <div className="d-flex align-items-center">
                  {eulaInfo.updating && (
                    <Spinner size="sm" role="status" aria-hidden="true" />
                  )}
                  <span>&nbsp;UPDATE</span>
                </div>
              </Button.Ripple>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default UpdateEula

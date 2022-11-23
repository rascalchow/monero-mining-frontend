import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { getEula, updateEula } from './store/action'

const UserUpdateEula = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const dispatch = useDispatch()
  const eula = useSelector((state) => state.eula.user)
  const onUpldateClick = () => {
    dispatch(
      updateEula(draftToHtml(convertToRaw(editorState.getCurrentContent()))),
    )
  }
  useEffect(() => {
    dispatch(getEula())
  }, [])

  useEffect(() => {
    if (eula.data) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(eula.data.eula)),
        ),
      )
    }
  }, [eula.data])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">EULA</CardTitle>
      </CardHeader>
      <CardBody>
        {eula.isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner className="spinner" />
          </div>
        ) : eula.error ? (
          <div className="d-flex justify-content-center py-5">
            <Alert color="danger">{eula.error}</Alert>
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
                  {eula.isUpdating && (
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

export default UserUpdateEula

import { useState, forwardRef } from 'react'
import Proptypes from 'prop-types'
import { Button, Label } from 'reactstrap'
import defaultImg from '../../assets/imgs/default.png'
import './style.scss'

const FileUpload = ({ defaultSrc, label, alt, onChange, ...props }, ref) => {
  const [preview, setPreview] = useState(defaultSrc || defaultImg)
  const onFileChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setPreview(reader.result)
    }
    reader.readAsDataURL(files[0])
    onChange(e)
  }

  return (
    <div className="file-upload">
      <div>{label && <Label>{label}</Label>}</div>
      <div className="d-flex align-items-center">
        <div>
          <img
            src={preview}
            alt={alt && 'preview'}
            width="80"
            height="80"
            className="rounded d-block file-upload-preview border"
          />
        </div>
        <div className="ml-1">
          <Button.Ripple
            color="primary"
            size="sm"
            className="mr-1 my-0"
            tag={Label}
          >
            <input
              type="file"
              hidden
              onChange={onFileChange}
              ref={ref}
              {...props}
            />
            Upload
          </Button.Ripple>
          <Button.Ripple
            size="sm"
            outline
            color="secondary"
            onClick={() => {
              setPreview(defaultSrc || defaultImg)
            }}
          >
            Reset
          </Button.Ripple>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(FileUpload)

FileUpload.propTypes = {
  defaultSrc: Proptypes.string,
  label: Proptypes.string,
  alt: Proptypes.string,
  onChange: Proptypes.func,
}

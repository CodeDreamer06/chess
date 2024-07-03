import './Files.sass'
import { getCharacter } from '../../../helper'

const Files = ({ files, hide }) => 
    <div className="files">
        {files.map(file => <span key={file} style={{ display: hide ? 'none' : 'block' }}>{getCharacter(file)}</span>)}
    </div>

export default Files
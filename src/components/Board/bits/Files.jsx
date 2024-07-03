import './Files.sass'
import { getCharacter } from '../../../utils/general'

const Files = ({ files, show }) => 
    <div className="files">
        {files.map(file => <span key={file} style={{ display: show ? 'block' : 'none' }}>{getCharacter(file)}</span>)}
    </div>

export default Files;
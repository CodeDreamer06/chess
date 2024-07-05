import './Files.sass'
import { getCharacter } from '../../../utils/general'

const Files = ({ files, show }) => 
    <div className="files" style={{ display: show ? 'flex' : 'none' }}>
        {files.map(file => <span key={file}>{getCharacter(file)}</span>)}
    </div>

export default Files;
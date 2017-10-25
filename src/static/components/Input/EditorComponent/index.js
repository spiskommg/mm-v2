import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

 onEditorStateChange = (editorState) => {
   this.setState({
     editorState,
   });
 }

 render() {
    const { editorState } = this.state;
   return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>
   );
 }
}

// const mapStateToProps = (state) => {
//     return {
//         editorState: state.editorState,
//     };
// };

export default connect(null)(EditorComponent);
export { EditorComponent as EditorComponentNotConnected };

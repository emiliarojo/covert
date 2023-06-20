import React from "react";
import ResponsiveModal from "react-responsive-modal";


const Search = props => {
  const { setModalVisible, modalVisible } = props;
  return (
    <ResponsiveModal
      open={modalVisible}
      onClose={() => setModalVisible(false)}
      animationDuration={1000}
      focusTrapped={true}
      closeIconSize={40}
      showCloseIcon={true}
    >
    <div className='popup-card'>Popup content here !!</div>
    </ResponsiveModal>
  );
};

export default Search;

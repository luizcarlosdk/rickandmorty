const Modal = ({ name, imageURL, episodes, closeModal }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <img className="cardImage" src={imageURL} alt={name} />
        <h2>{name}</h2>
        <p>
          <b>Episodes</b>: {episodes.map((episode) => episode.id).join(", ")}
        </p>
        <button className="closeModal" onClick={closeModal}>
          Return to cards
        </button>
      </div>
    </div>
  );
};

export default Modal;

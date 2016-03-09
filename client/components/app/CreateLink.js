const React = require('react');

const CreateLink = ({ onSubmit }) => {
  let input;
  return (
    <div className="columns">
      <div className="column is-half is-offset-quarter">
        <p className="title">Submit Link</p>
        <p className="subtitle">Paste in the link to your content&hellip;</p>
        <form onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          onSubmit(input.value);
          input.value = '';
        }}
        >
          <p className="control">
            <input className="input is-large" placeholder="http://&hellip;" ref={node => {
              input = node;
            }}
            />
          </p>
          <p className="control">
            <button className="button is-primary">Submit Link</button>
            &nbsp;
            <button className="button">Cancel</button>
          </p>
        </form>
      </div>
    </div>
  );
};

module.exports = CreateLink;

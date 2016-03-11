const React = require('react');
const EntryAuthor = require('./EntryAuthor');


const EntryView = () => {
  return (
    <div className="columns">
      <div className="column is-8 is-offset-2">   
        <div className="box">
          <div className="video-wrapper">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/fICcd-okQEs" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <br /><br />
        <p className="title is-3">#CareLikeCrazy About Student Loans</p>
        <div className="columns">
          <div className="column is-8">
            <p className="title is-5">We all have a reason to vote. Whatever yours is, make sure you're registered</p>
            <br />
            {/* Main navigation */}
            <EntryAuthor />
          </div>
          <div className="column is-4">
            <table className="table">
              <tbody>
                <tr>
                  <td className="table-icon"><i className="fa fa-youtube"></i></td>
                  <td><a href="https://youtu.be/fICcd-okQEs">youtu.be/fICcd-okQEs</a></td>
                </tr>
                <tr>
                  <td className="table-icon"><i className="fa fa-eye"></i></td>
                  <td>12,566 Views</td>
                </tr>
                <tr>
                  <td className="table-icon"><i className="fa fa-thumbs-o-up"></i></td>
                  <td>26 Likes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = EntryView;

const Table = ({ data }) => {
  return (
    <table>
      <tr>
        <th>Dates</th>
        <th>EGP</th>
        <th>CAD</th>
      </tr>
      {Object.entries(data).map((item, key) => (
        <tr key={key}>
          {item[1].EGP !== undefined && ( //condition for don't view empty objects
            <>
              <td>{item[0]}</td>
              <td>{item[1].EGP}</td>
              <td>{item[1].CAD}</td>
            </>
          )}
        </tr>
      ))}
    </table>
  );
};

export default Table;

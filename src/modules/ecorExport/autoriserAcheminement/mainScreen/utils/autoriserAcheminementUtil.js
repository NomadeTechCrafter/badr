
export const getFormattedScelles = (scelles) => {
  let listeNombreDeScelles = [];
  Object.entries(scelles).map(item => {
    console.log(item[0]);
    listeNombreDeScelles.push(item[0]);
  })
  return listeNombreDeScelles;
}


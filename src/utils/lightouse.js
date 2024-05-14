import lighthouse from '@lighthouse-web3/sdk'

export async function makeFileObjects(data) {

  // const obj = { hello: "world" };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const files = [
    // new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "world.json"),
  ];
  return files;
}

const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
  console.log(percentageDone)
}

export const uploadFile = async (file) => {
  // Push file to lighthouse node
  // Both file and folder are supported by upload function
  // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
  // Fourth parameter is the deal parameters, default null
  const output = await lighthouse.upload(file, process.env.REACT_APP_LIGHTHOUSE, false, null, progressCallback)
  console.log('File Status:', output)
  /*
    output:
      data: {
        Name: "filename.txt",
        Size: 88000,
        Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
      }
    Note: Hash in response is CID.
  */
  console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
  return output.data.Hash
}
import React from 'react';

const IpfsApiDocs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-white">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          IPFS Upload API
        </h1>
        <p className="text-gray-600 text-lg">
          Seamlessly upload and manage files on IPFS with our simple and secure API
        </p>
      </div>

      {/* Request Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Request</h2>
        
        {/* Endpoint */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-blue-500">
            Endpoint
          </h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono">
            POST /api/test
          </div>
        </div>

        {/* Headers */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-purple-500">
            Headers
          </h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono">
            Content-Type: multipart/form-data
          </div>
        </div>

        {/* Body Parameters */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-teal-500">
            Body Parameters
          </h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono">
            file: File (required)<br />
            filename: string (required)
          </div>
        </div>
      </div>

      {/* Response Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Response</h2>

        {/* Success Response */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-green-500">
            Success Response
          </h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono">
{`{
  "signature": "54SjrZHdmvipasHtnSqLsDT2qgpWqSUPaisnebPQaHGdVxJSipffLDWeAqw5VnioqyvKFGy6CxaKUGSJJMTarScb",
  "ipfsHash": "QmQcjudiBnTGTWdXkYgTt3SvAdM9vygbgcJGwWpLjyBCxd"
}`}
          </div>
        </div>

        {/* Response Fields */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-amber-500">
            Response Fields
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg hover:border-blue-300 transition-colors">
              <dt className="font-medium text-gray-800">signature: string</dt>
              <dd className="text-gray-600 mt-1">Unique signature for the uploaded file</dd>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg hover:border-blue-300 transition-colors">
              <dt className="font-medium text-gray-800">ipfsHash: string</dt>
              <dd className="text-gray-600 mt-1">IPFS hash (CID) of the uploaded file</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12" />
    </div>
  );
};

export default IpfsApiDocs;
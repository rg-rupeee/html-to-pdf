# HTML to PDF Conversion Service

The HTML to PDF Conversion Service is a utility that allows you to convert HTML content into PDF files. It provides three different API endpoints for PDF generation:

1. Generate PDF from a URL
2. Generate PDF from HTML data in the request body
3. Generate PDF from an HTML file provided in the request body

## Getting Started

These instructions will help you get started with the service on your local machine.

### Prerequisites

- Install the wkhtmltopdf command line tool on your system
- Be sure the wkhtmltopdf command line tool is in your PATH when you're done installing
- Node.js and npm installed on your system

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/rg-rupeee/html-to-pdf.git
   ```

2. Navigate to the project directory:

   ```shell
   cd html-to-pdf
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

### Usage

1. Create a new file in the same directory and name it `.env.local`. This will be your local environment configuration file. Locate the `.example.env` file in your project directory. This file should contain sample configuration keys and values.

2. Start the service:

   ```shell
   npm run start:local
   ```

3. Access the Swagger documentation at `http://localhost:3010/swagger` in your web browser.

   Here, you can explore the available API endpoints, view request examples, and even try out the API calls using the interactive Swagger UI interface.

## API Endpoints

The service offers the following API endpoints for HTML to PDF conversion:

### 1. Generate PDF from URL

- Endpoint: `/api/v1/html-pdf/wkhtmltopdf/url`
- Method: POST
- Description: Convert HTML content from a given URL to a PDF file.

### 2. Generate PDF from Body Data

- Endpoint: `/api/v1/html-pdf/wkhtmltopdf/data`
- Method: POST
- Description: Convert HTML content provided in the request body to a PDF file.

### 3. Generate PDF from File in Request Body

- Endpoint: `/api/v1/html-pdf/wkhtmltopdf/file`
- Method: POST
- Description: Convert HTML content from a file provided in the request body to a PDF file.

## Example API Calls

You can use tools like `curl` to make API calls to the service. Here are some example `curl` commands for each endpoint:

#### Generate PDF from URL

```shell
curl --location '{{BASE_URL}}/api/v1/html-pdf/wkhtmltopdf/url' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://www.google.com",
    "callbackUri": "https://webhook.site/d0a1ec94-93d5-4071-96ea-f8b35749dcd5"
}'
```

#### Generate PDF from Body Data

```shell
curl --location '{{BASE_URL}}/api/v1/html-pdf/wkhtmltopdf/data' \
--header 'Content-Type: application/json' \
--data '{
    "fileData": "<h1>Hello I am Rupesh</h1>",
    "callbackUri": "https://webhook.site/d0a1ec94-93d5-4071-96ea-f8b35749dcd5"
}'
```

#### Generate PDF from File in Request Body

```shell
curl --location '{{BASE_URL}}/api/v1/html-pdf/wkhtmltopdf/file' \
--header 'Content-Type: application/json' \
--form 'callbackUri="https://webhook.site/d0a1ec94-93d5-4071-96ea-f8b35749dcd5"' \
--form 'file=@"/path/to/your/html/file.html"'
```

## Acknowledgments

- This service uses the `wkhtmltopdf` library for HTML to PDF conversion.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

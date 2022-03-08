export const responseTemplate = (url: string, width?: string, height?: string) => {
    return `
    <html>
        <head>
            <meta property="og:image" content='${url}'>
        </head>
        <body>
            <img src='${url}' ${width ? `width='${width}'` : ''} ${height ? `height='${height}'` : ''}'/>
        </body>
    </html>
    `
}
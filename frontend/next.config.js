module.exports = {
    async redirects(){
        return [
            {
                source: '/',
                destination: '/dashboard/profile',
                permanent: true
            },
            {
                source: '/dashboard',
                destination: '/dashboard/profile',
                permanent: true
            }

        ]
    }
}
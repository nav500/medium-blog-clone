export interface Post {
    _id: string,
    title: string,
    description: string,
    slug: {
        _type: string,
        current: string
    },
    author: {
        name: string,
        image: {
            _type: string,
            asset: {
                _ref: string,
                _type: string
            }
        }
    }
    mainImage: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    }
    body: object[],
    publishedAt: string
}
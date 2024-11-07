// types.d.ts
declare namespace TYPES {
  type Pagination<T> = {
    content: Array<T>
    totalPages: number
    totalElements: number
  }
  type Range = {
    startDate: string
    endDate: string
  }
  type UserState = 'unauthenticated' | 'authenticated' | 'pending'
  type PropertyImage = {
    image: Blob
    description: string
  }
  type PropertyFormData = {
    address: {
      // Address step
      street: string
      city: string
      country: string
      zipCode: string
      floor: number
      apartmentNum: number
    }
    details: {
      // Details step
      size: string
      bedrooms: number
      bathrooms: number
      rooms: number
      price: number
      currency: string
      period: string
    }
    images: Array<PropertyImage>

    description: {
      description: string
      phone: {
        country: string
        number: string
      }
      email: string
    }
  }
}

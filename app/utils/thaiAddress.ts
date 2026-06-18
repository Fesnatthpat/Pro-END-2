import { getAllData } from 'thai-data'

const data = getAllData()

let cachedProvinces: string[] | null = null
const districtCache = new Map<string, string[]>()
const subdistrictCache = new Map<string, { subdistrict: string; zipcode: string }[]>()

export const getProvinces = () => {
  if (cachedProvinces) return cachedProvinces
  
  const provinces = new Set<string>()
  data.forEach(item => {
    item.provinceList?.forEach(p => provinces.add(p.provinceName))
  })
  cachedProvinces = Array.from(provinces).sort((a, b) => a.localeCompare(b, 'th'))
  return cachedProvinces
}

export const getDistricts = (provinceName: string) => {
  if (!provinceName) return []
  if (districtCache.has(provinceName)) return districtCache.get(provinceName)!

  const districts = new Set<string>()
  data.forEach(item => {
    const hasProvince = item.provinceList?.some(p => p.provinceName === provinceName)
    if (hasProvince) {
      item.districtList?.forEach(d => districts.add(d.districtName))
    }
  })
  const result = Array.from(districts).sort((a, b) => a.localeCompare(b, 'th'))
  districtCache.set(provinceName, result)
  return result
}

export const getSubdistricts = (provinceName: string, districtName: string) => {
  if (!provinceName || !districtName) return []
  const cacheKey = `${provinceName}-${districtName}`
  if (subdistrictCache.has(cacheKey)) return subdistrictCache.get(cacheKey)!

  const subdistricts: { subdistrict: string; zipcode: string }[] = []
  data.forEach(item => {
    const hasProvince = item.provinceList?.some(p => p.provinceName === provinceName)
    const hasDistrict = item.districtList?.some(d => d.districtName === districtName)
    if (hasProvince && hasDistrict) {
      item.subDistrictList?.forEach(s => {
        subdistricts.push({
          subdistrict: s.subDistrictName,
          zipcode: item.zipCode.toString()
        })
      })
    }
  })
  
  // Remove duplicates and sort
  const seen = new Set<string>()
  const result = subdistricts.filter(s => {
    const key = `${s.subdistrict}-${s.zipcode}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).sort((a, b) => a.subdistrict.localeCompare(b.subdistrict, 'th'))

  subdistrictCache.set(cacheKey, result)
  return result
}

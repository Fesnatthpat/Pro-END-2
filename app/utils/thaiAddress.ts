import { getAllData } from 'thai-data'

const data = getAllData()

export const getProvinces = () => {
  const provinces = new Set<string>()
  data.forEach(item => {
    item.provinceList?.forEach(p => provinces.add(p.provinceName))
  })
  return Array.from(provinces).sort((a, b) => a.localeCompare(b, 'th'))
}

export const getDistricts = (provinceName: string) => {
  if (!provinceName) return []
  const districts = new Set<string>()
  data.forEach(item => {
    const hasProvince = item.provinceList?.some(p => p.provinceName === provinceName)
    if (hasProvince) {
      item.districtList?.forEach(d => districts.add(d.districtName))
    }
  })
  return Array.from(districts).sort((a, b) => a.localeCompare(b, 'th'))
}

export const getSubdistricts = (provinceName: string, districtName: string) => {
  if (!provinceName || !districtName) return []
  const subdistricts: { subdistrict: string; zipcode: string }[] = []
  data.forEach(item => {
    const hasProvince = item.provinceList?.some(p => p.provinceName === provinceName)
    const hasDistrict = item.districtList?.some(d => d.districtName === districtName)
    if (hasProvince && hasDistrict) {
      item.subDistrictList?.forEach(s => {
        subdistricts.push({
          subdistrict: s.subDistrictName,
          zipcode: item.zipCode
        })
      })
    }
  })
  
  // Remove duplicates and sort
  const seen = new Set<string>()
  return subdistricts.filter(s => {
    const key = `${s.subdistrict}-${s.zipcode}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).sort((a, b) => a.subdistrict.localeCompare(b.subdistrict, 'th'))
}

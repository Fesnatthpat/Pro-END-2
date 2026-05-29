<template>
  <NuxtLayout :name="layoutName">
    <div class="min-h-screen bg-gray-100 py-8 px-4  print:bg-white print:p-0">
      
      <div class="max-w-[210mm] mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-[#1a1a40] transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm w-full md:w-auto justify-center">
          <span class="material-symbols-rounded">arrow_back</span> ย้อนกลับ
        </button>
        
        <div class="flex flex-wrap justify-center gap-2 md:gap-3">
          <button v-if="!isAdmin" @click="clearDraft" class="bg-rose-50 text-rose-600 border border-rose-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-rose-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded text-base">delete_sweep</span> ล้างฉบับร่าง
          </button>
          <button v-if="!isAdmin" @click="saveDraft" class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-emerald-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded">save</span> บันทึกข้อมูล
          </button>
          <button @click="printDocument" class="bg-[#1a1a40] text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#2a2a5c] transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded">print</span> พิมพ์เอกสาร (CP3)
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center gap-8 print:block print:w-full print:gap-0 print:m-0 print:p-0">
        
        <div class="print-page-wrapper w-full overflow-x-auto flex justify-center pb-4 print:overflow-visible print:pb-0">
          <div class="paper-a4 bg-white shadow-lg relative text-black text-[15px] md:text-[16px] leading-[1.8] print:leading-[1.4] print:shadow-none">
            
            <div class="absolute top-8 right-8 text-sm font-bold print:top-2 print:right-4">CP-3</div>

            <div class="text-center mb-6 mt-4 print:mb-2 print:mt-0">
              <img src="/bsru_logo.jpg" alt="BSRU Logo" class="w-[80px] mx-auto mb-3 print:mb-1 print:w-[50px]">
              <h2 class="font-bold text-[18px] mb-1 print:text-[15px]">แบบขออนุมัติโครงงานคอมพิวเตอร์</h2>
              <h3 class="font-bold text-[16px] print:text-[14px]">สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
              <h3 class="font-bold text-[16px] print:text-[14px]">มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา</h3>
              <div class="flex justify-center mt-2 print:mt-1">
                <div class="border-b-[1.5px] border-dashed border-gray-500 w-[150px]"></div>
              </div>
            </div>

            <div class="flex justify-end mb-4 print:mb-[4px]">
              <div class="flex items-end w-[300px]">
                <span class="whitespace-nowrap">ภาคเรียนที่</span>
                <input type="text" v-model="form.semester" class="form-line w-12 text-center mx-2">
                <span class="whitespace-nowrap">ปีการศึกษา</span>
                <input type="text" v-model="form.academicYear" class="form-line flex-grow text-center ml-2">
              </div>
            </div>

            <div class="mb-5 print:mb-[4px]">
              <div class="flex items-end w-full mb-1 print:mb-0">
                <span class="whitespace-nowrap font-bold">ชื่อเรื่อง (ภาษาไทย)</span>
                <input type="text" v-model="form.projectTitleTh" class="form-line flex-grow ml-2">
              </div>
              <div class="flex items-end w-full">
                <div class="flex-grow border-b-[1.5px] border-dotted border-black h-5 print:h-3 w-full"></div>
              </div>
            </div>

            <div class="mb-5 print:mb-[4px]">
              <div class="font-bold text-center mb-2 print:mb-0">คนที่ 1</div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s1.name" class="form-line flex-grow mx-2 pl-2">
                <span class="whitespace-nowrap">รหัสนักศึกษา</span>
                <input type="text" v-model="s1.studentId" class="form-line w-32 ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ที่อยู่ที่ติดต่อได้ เลขที่</span>
                <input type="text" v-model="s1.addressNo" class="form-line w-16 mx-2 text-center">
                <span class="whitespace-nowrap">หมู่ที่</span>
                <input type="text" v-model="s1.moo" class="form-line w-12 mx-2 text-center">
                <span class="whitespace-nowrap">ซอย</span>
                <input type="text" v-model="s1.soi" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">ถนน</span>
                <input type="text" v-model="s1.road" class="form-line flex-grow ml-2">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ตำบล/แขวง</span>
                <input type="text" v-model="s1.subdistrict" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">อำเภอ/เขต</span>
                <input type="text" v-model="s1.district" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">จังหวัด</span>
                <input type="text" v-model="s1.province" class="form-line flex-grow ml-2">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">รหัสไปรษณีย์</span>
                <input type="text" v-model="s1.zipcode" class="form-line w-24 mx-2 text-center">
                <span class="whitespace-nowrap">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s1.phone" class="form-line flex-grow mx-2 text-center">
                <span class="whitespace-nowrap">E-mail</span>
                <input type="email" v-model="s1.email" class="form-line flex-grow ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">Line Id</span>
                <input type="text" v-model="s1.lineId" class="form-line flex-grow mx-2 text-center">
                <span class="whitespace-nowrap">โทรศัพท์บ้าน</span>
                <input type="text" v-model="s1.homePhone" class="form-line flex-grow ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">กรณีฉุกเฉิน ติดต่อ เบอร์โทร</span>
                <input type="text" v-model="s1.emergencyContact" class="form-line flex-grow ml-2">
              </div>
            </div>

            <div class="mb-8 print:mb-[4px]">
              <div class="font-bold text-center mb-2 print:mb-0">คนที่ 2</div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s2.name" class="form-line flex-grow mx-2 pl-2">
                <span class="whitespace-nowrap">รหัสนักศึกษา</span>
                <input type="text" v-model="s2.studentId" class="form-line w-32 ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ที่อยู่ที่ติดต่อได้ เลขที่</span>
                <input type="text" v-model="s2.addressNo" class="form-line w-16 mx-2 text-center">
                <span class="whitespace-nowrap">หมู่ที่</span>
                <input type="text" v-model="s2.moo" class="form-line w-12 mx-2 text-center">
                <span class="whitespace-nowrap">ซอย</span>
                <input type="text" v-model="s2.soi" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">ถนน</span>
                <input type="text" v-model="s2.road" class="form-line flex-grow ml-2">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">ตำบล/แขวง</span>
                <input type="text" v-model="s2.subdistrict" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">อำเภอ/เขต</span>
                <input type="text" v-model="s2.district" class="form-line flex-grow mx-2">
                <span class="whitespace-nowrap">จังหวัด</span>
                <input type="text" v-model="s2.province" class="form-line flex-grow ml-2">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">รหัสไปรษณีย์</span>
                <input type="text" v-model="s2.zipcode" class="form-line w-24 mx-2 text-center">
                <span class="whitespace-nowrap">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s2.phone" class="form-line flex-grow mx-2 text-center">
                <span class="whitespace-nowrap">E-mail</span>
                <input type="email" v-model="s2.email" class="form-line flex-grow ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">Line Id</span>
                <input type="text" v-model="s2.lineId" class="form-line flex-grow mx-2 text-center">
                <span class="whitespace-nowrap">โทรศัพท์บ้าน</span>
                <input type="text" v-model="s2.homePhone" class="form-line flex-grow ml-2 text-center">
              </div>
              <div class="flex items-end mb-2 print:mb-[2px] w-full overflow-hidden">
                <span class="whitespace-nowrap">กรณีฉุกเฉิน ติดต่อ เบอร์โทร</span>
                <input type="text" v-model="s2.emergencyContact" class="form-line flex-grow ml-2">
              </div>
            </div>

            <div>
              <div class="flex justify-between px-10 mb-4 print:mb-2 mt-4 print:mt-1">
                <div class="flex flex-col items-center w-[250px]">
                  <div class="flex items-end w-full mb-1 print:mb-0">
                    <span class="whitespace-nowrap">ลงชื่อ</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                    <span class="whitespace-nowrap">นักศึกษา</span>
                  </div>
                  <div class="flex items-end w-full">
                    <span class="whitespace-nowrap">(</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-5 print:h-4 text-center leading-5 print:leading-4 text-gray-600">
                      {{ s1.name }}
                    </div>
                    <span class="whitespace-nowrap">)</span>
                  </div>
                </div>

                <div class="flex flex-col items-center w-[250px]">
                  <div class="flex items-end w-full mb-1 print:mb-0">
                    <span class="whitespace-nowrap">ลงชื่อ</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                    <span class="whitespace-nowrap">นักศึกษา</span>
                  </div>
                  <div class="flex items-end w-full">
                    <span class="whitespace-nowrap">(</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-5 print:h-4 text-center leading-5 print:leading-4 text-gray-600">
                      {{ s2.name }}
                    </div>
                    <span class="whitespace-nowrap">)</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-center mb-10 print:mb-4">
                <div class="flex items-end w-[250px]">
                  <span class="whitespace-nowrap">วันที่</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4 text-center"></div>
                </div>
              </div>

              <div class="flex justify-between px-4">
                <div class="flex flex-col items-center w-[280px]">
                  <div class="flex items-end w-full mb-1 print:mb-[2px]">
                    <span class="whitespace-nowrap">ลงชื่อ</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                    <span class="whitespace-nowrap">ที่ปรึกษาหลัก</span>
                  </div>
                  <div class="flex items-end w-full">
                    <span class="whitespace-nowrap">(</span>
                    <input type="text" v-model="form.advisorName" placeholder="พิมพ์ชื่ออาจารย์ที่ปรึกษาหลัก" class="form-line flex-grow mx-2 text-center text-gray-600 bg-transparent outline-none print:placeholder-transparent">
                    <span class="whitespace-nowrap">)</span>
                  </div>
                </div>

                <div class="flex flex-col items-center w-[280px]">
                  <div class="flex items-end w-full mb-1 print:mb-[2px]">
                    <span class="whitespace-nowrap">ลงชื่อ</span>
                    <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                    <span class="whitespace-nowrap">ที่ปรึกษาร่วม</span>
                  </div>
                  <div class="flex items-end w-full">
                    <span class="whitespace-nowrap">(</span>
                    <input type="text" v-model="form.coAdvisorName" placeholder="พิมพ์ชื่ออาจารย์ที่ปรึกษาร่วม" class="form-line flex-grow mx-2 text-center text-gray-600 bg-transparent outline-none print:placeholder-transparent">
                    <span class="whitespace-nowrap">)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="print-page-wrapper w-full overflow-x-auto flex justify-center pb-4 print:overflow-visible print:pb-0">
          <div class="paper-a4 bg-white shadow-lg relative text-black text-[15px] md:text-[16px] leading-[1.8] print:shadow-none">
            
            <div class="text-right mb-4 text-sm font-bold">CP-3</div>

            <div class="border-[2px] border-black relative mb-12 print:mb-8">
              <div class="absolute top-0 right-0 border-l-[2px] border-b-[2px] border-black px-4 py-2 bg-white font-bold">
                สำหรับคณะกรรมการสอบ
              </div>
              
              <div class="p-6 print:p-4">
                <h3 class="font-bold mb-6 mt-2 text-[16px] print:mb-4">มติของคณะกรรมการสอบปากเปล่าโครงงานคอมพิวเตอร์</h3>
                
                <div class="flex flex-wrap gap-8 mb-6 print:mb-4 pl-4 font-bold">
                  <div class="flex items-center gap-2"><span>( &nbsp;&nbsp;&nbsp; )</span> <span>ดีมาก</span></div>
                  <div class="flex items-center gap-2"><span>( &nbsp;&nbsp;&nbsp; )</span> <span>ดี</span></div>
                  <div class="flex items-center gap-2"><span>( &nbsp;&nbsp;&nbsp; )</span> <span>พอใช้</span></div>
                  <div class="flex items-center gap-2"><span>( &nbsp;&nbsp;&nbsp; )</span> <span>ไม่ผ่าน</span></div>
                </div>

                <div class="mb-4 print:mb-3 font-bold flex items-center gap-2">
                  <span>โดย</span>
                  <span>( &nbsp;&nbsp;&nbsp; )</span>
                  <span>ไม่มีเงื่อนไข</span>
                </div>

                <div class="mb-6 print:mb-4 pl-10 flex items-center gap-2">
                  <span>( &nbsp;&nbsp;&nbsp; )</span>
                  <span class="font-bold">มีเงื่อนไข</span>
                  <span class="italic text-gray-600 print:text-[13px]">(ให้แก้ไขตามบันทึกผลการสอบปากเปล่าโครงงานคอมพิวเตอร์)</span>
                </div>

                <div class="flex items-end w-full mb-3 print:mb-2 mt-4">
                  <span class="whitespace-nowrap mr-2">หมายเหตุเพิ่มเติม</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black"></div>
                </div>
                <div class="border-b-[1.5px] border-dotted border-black w-full mb-3 print:mb-2 h-6 print:h-5"></div>
                <div class="border-b-[1.5px] border-dotted border-black w-full mb-3 print:mb-2 h-6 print:h-5"></div>
                <div class="border-b-[1.5px] border-dotted border-black w-full h-6 print:h-5"></div>
              </div>
            </div>

            <div class="px-4">
              <div class="mb-8 print:mb-6">
                <div class="flex items-end w-[400px] mb-2 print:mb-1">
                  <span class="whitespace-nowrap">ลงชื่อ</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">ประธานกรรมการ</span>
                </div>
                <div class="flex items-end w-[280px] mb-2 print:mb-1">
                  <span class="whitespace-nowrap">(</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">)</span>
                </div>
                <div class="flex items-end pl-4">
                  <span class="whitespace-nowrap">วันที่</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">/</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">/</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-y-8 gap-x-12 mb-8 print:mb-6 print:gap-y-5 print:gap-x-6">
                <template v-for="i in 6" :key="i">
                  <div class="w-full">
                    <div class="flex items-end w-full mb-2 print:mb-1">
                      <span class="whitespace-nowrap">ลงชื่อ</span>
                      <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                      <span class="whitespace-nowrap">กรรมการ</span>
                    </div>
                    <div class="flex items-end w-[280px] mb-2 print:mb-1">
                      <span class="whitespace-nowrap">(</span>
                      <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                      <span class="whitespace-nowrap">)</span>
                    </div>
                    <div class="flex items-end pl-4">
                      <span class="whitespace-nowrap">วันที่</span>
                      <div class="w-8 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                      <span class="whitespace-nowrap">/</span>
                      <div class="w-8 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                      <span class="whitespace-nowrap">/</span>
                      <div class="w-8 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                    </div>
                  </div>
                </template>
              </div>

              <div>
                <div class="flex items-end w-[400px] mb-2 print:mb-1">
                  <span class="whitespace-nowrap">ลงชื่อ</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">ประธานสาขาวิทยาการคอมพิวเตอร์</span>
                </div>
                <div class="flex items-end w-[280px] mb-2 print:mb-1">
                  <span class="whitespace-nowrap">(</span>
                  <div class="flex-grow border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">)</span>
                </div>
                <div class="flex items-end pl-4">
                  <span class="whitespace-nowrap">วันที่</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">/</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                  <span class="whitespace-nowrap">/</span>
                  <div class="w-10 border-b-[1.5px] border-dotted border-black mx-2 h-4"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="print-page-wrapper w-full overflow-x-auto flex justify-center pb-4 print:overflow-visible print:pb-0">
          <div class="paper-a4 bg-white shadow-lg relative text-black text-[15px] md:text-[16px] leading-[1.8] print:shadow-none">
            <div class="text-right mb-6 text-sm font-bold">CP-3</div>
            <h3 class="font-bold text-[18px] mb-8 print:mb-6">บันทึกผลการสอบโครงงานคอมพิวเตอร์</h3>
            
            <div class="flex flex-col mt-4">
              <div v-for="n in 20" :key="'line-'+n" class="border-b-[1.5px] border-dotted border-black w-full h-8 print:h-7"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { reactive, onMounted, watchEffect, computed, ref } from 'vue'

const userCookie = useCookie('user_session')
const user = computed(() => userCookie.value)
const route = useRoute()
const projectIdParam = route.query.projectId
const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'teacher')

definePageMeta({
  layout: false
})

const layoutName = computed(() => {
  if (user.value?.role === 'admin') return 'admin'
  if (user.value?.role === 'teacher') return 'teacher'
  return 'student'
})

useHead({
  title: 'แบบประเมินสอบ (CP3)'
})

const form = reactive({
  semester: '',
  academicYear: '',
  projectTitleTh: '',
  advisorName: '',
  coAdvisorName: ''
})

const s1 = reactive({
  name: '', 
  studentId: '',
  addressNo: '', moo: '', soi: '', road: '',
  subdistrict: '', district: '', province: '', zipcode: '',
  phone: '', email: '',
  lineId: '', homePhone: '', emergencyContact: ''
})

const s2 = reactive({
  name: '', studentId: '',
  addressNo: '', moo: '', soi: '', road: '',
  subdistrict: '', district: '', province: '', zipcode: '',
  phone: '', email: '',
  lineId: '', homePhone: '', emergencyContact: ''
})

// Fetch project data
const fetchUrl = (isAdmin.value && projectIdParam) ? '/api/admin/project-detail' : '/api/student/my-project'
const fetchQuery = (isAdmin.value && projectIdParam) ? { id: projectIdParam } : undefined

const { data: projectData } = await useFetch(fetchUrl, {
  query: fetchQuery
})
const project = computed(() => projectData.value?.project)

watchEffect(() => {
  if (project.value) {
    form.semester = project.value.semester || ''
    form.academicYear = project.value.academicYear || ''
    form.projectTitleTh = project.value.titleTh || ''
    form.advisorName = project.value.advisor?.fullname || ''
    form.coAdvisorName = project.value.coAdvisor?.fullname || ''

    if (project.value.student1) {
      const s = project.value.student1
      s1.name = s.fullname || ''
      s1.studentId = s.username || ''
      s1.addressNo = s.addressNo || ''
      s1.moo = s.moo || ''
      s1.soi = s.soi || ''
      s1.road = s.road || ''
      s1.subdistrict = s.subdistrict || ''
      s1.district = s.district || ''
      s1.province = s.province || ''
      s1.zipcode = s.zipcode || ''
      s1.phone = s.tel || ''
      s1.email = s.email || ''
      s1.lineId = s.lineId || ''
      s1.homePhone = s.homePhone || ''
      s1.emergencyContact = s.emergencyContact || ''
    }

    if (project.value.student2) {
      const s = project.value.student2
      s2.name = s.fullname || ''
      s2.studentId = s.username || ''
      s2.addressNo = s.addressNo || ''
      s2.moo = s.moo || ''
      s2.soi = s.soi || ''
      s2.road = s.road || ''
      s2.subdistrict = s.subdistrict || ''
      s2.district = s.district || ''
      s2.province = s.province || ''
      s2.zipcode = s.zipcode || ''
      s2.phone = s.tel || ''
      s2.email = s.email || ''
      s2.lineId = s.lineId || ''
      s2.homePhone = s.homePhone || ''
      s2.emergencyContact = s.emergencyContact || ''
    }
    
    // Merge draft data if DB values are missing
    const saved = localStorage.getItem('cp3_draft')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (!form.semester && data.form?.semester) form.semester = data.form.semester
        if (!form.academicYear && data.form?.academicYear) form.academicYear = data.form.academicYear
        if (!form.projectTitleTh && data.form?.projectTitleTh) form.projectTitleTh = data.form.projectTitleTh
      } catch (e) {
        console.error('Failed to merge CP3 draft:', e)
      }
    }
  }
})

const { success: alertSuccess, error: alertError, confirm: alertConfirm } = useAlerts()
const submitting = ref(false)

const clearDraft = async () => {
  const result = await alertConfirm('ล้างข้อมูลฉบับร่าง', 'คุณต้องการล้างข้อมูลที่บันทึกไว้ในเครื่องนี้ใช่หรือไม่? (ข้อมูลในฐานข้อมูลจะไม่ถูกลบ)')
  if (result.isConfirmed) {
    localStorage.removeItem('cp3_draft')
    window.location.reload()
  }
}

const clearForm = async () => {
  const result = await alertConfirm('ยืนยันการดำเนินการ', 'คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลที่กรอกไปแล้วทั้งหมด?', 'warning')
  if (result.isConfirmed) {
    form.semester = ''
    form.academicYear = ''
    form.projectTitleTh = ''
    form.advisorName = ''
    form.coAdvisorName = ''
    // Clear s1
    Object.keys(s1).forEach(key => s1[key] = '')
    // Clear s2
    Object.keys(s2).forEach(key => s2[key] = '')
    localStorage.removeItem('cp3_draft')
  }
}

const printDocument = () => {
  window.print()
}

const saveDraft = async () => {
  submitting.value = true
  try {
    const response = await $fetch('/api/student/save-cp-data', {
      method: 'POST',
      body: {
        projectId: project.value?.id,
        titleTh: form.projectTitleTh,
        semester: form.semester,
        academicYear: form.academicYear,
        student1: s1,
        student2: s2.studentId ? s2 : null
      }
    })

    if (response.success) {
      const draftData = { form, s1, s2 }
      localStorage.setItem('cp3_draft', JSON.stringify(draftData))
      alertSuccess('บันทึกสำเร็จ', 'บันทึกข้อมูลลงระบบเรียบร้อยแล้ว อาจารย์สามารถเห็นการเปลี่ยนแปลงได้ทันที')
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'ไม่สามารถบันทึกข้อมูลลงเซิร์ฟเวอร์ได้ แต่บันทึกในเครื่องแล้ว')
    const draftData = { form, s1, s2 }
    localStorage.setItem('cp3_draft', JSON.stringify(draftData))
  } finally {
    submitting.value = false
  }
}
</script>

<style>
@media print {
  footer, .footer, header, nav {
    display: none !important;
  }
}
</style>

<style scoped>
.paper-a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm 20mm; 
  box-sizing: border-box;
}

.form-line {
  border: none;
  border-bottom: 1.5px dotted #000;
  background-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  font-family: inherit;
  color: #000;
  padding: 0 4px;
  margin: 0;
  border-radius: 0;
  min-width: 0 !important; 
  height: 26px; 
  line-height: 26px; 
}

.form-line:focus {
  border-bottom: 1.5px solid #1a1a40;
}

.border-\[2px\] { border-width: 2px !important; }

/* ================= ปราบผีกระดาษขาว ================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 0; 
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .print-page-wrapper {
    page-break-after: always !important; 
    break-after: page !important;
  }
  
  .print-page-wrapper:last-child {
    page-break-after: auto !important;
    break-after: auto !important;
  }

  .paper-a4 {
    width: 210mm !important;
    height: 297mm !important; 
    max-height: 297mm !important;
    margin: 0 !important;
    padding: 10mm 15mm !important; 
    border: none !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    overflow: hidden !important; 
    page-break-inside: avoid !important; 
    break-inside: avoid !important;
  }

  .print\:hidden {
    display: none !important;
  }
  
  .form-line {
    height: 22px !important;
    line-height: 22px !important;
  }

  .form-line::placeholder {
    color: transparent !important; 
  }
  
  .border-black {
    border-color: black !important;
  }
}
</style>
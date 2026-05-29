<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4  print:bg-white print:py-0 print:px-0">
    
    <!-- แถบเครื่องมือและเลือกอาจารย์ (เฉพาะหน้าจอ) -->
    <div class="max-w-[210mm] mx-auto mb-6 flex flex-col gap-4 print:hidden">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <NuxtLink to="/student" class="flex items-center gap-2 text-gray-600 hover:text-[#1a1a40] transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm w-full md:w-auto justify-center">
          <span class="material-symbols-rounded">arrow_back</span> กลับหน้าหลัก
        </NuxtLink>
        
        <div class="flex flex-wrap justify-center gap-2 md:gap-3">
          <button v-if="!isAdmin" @click="handleSubmit" :disabled="submitting" class="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base disabled:opacity-50">
            <span class="material-symbols-rounded">send</span> {{ submitting ? 'กำลังบันทึก...' : 'ยื่นขออนุมัติหัวข้อ' }}
          </button>
          <button @click="printDocument" class="bg-[#1a1a40] text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#2a2a5c] transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded">print</span> พิมพ์เอกสาร
          </button>
        </div>
      </div>

      <!-- เลือกอาจารย์ที่ปรึกษาและเพื่อนร่วมกลุ่ม (แสดงเฉพาะหน้าจอ) -->
      <div v-if="!isAdmin && !isSubmitted" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">เลือกอาจารย์ที่ปรึกษาหลัก</label>
          <select v-model="advisorId" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#1a1a40] transition-all">
            <option value="">-- กรุณาเลือกอาจารย์ --</option>
            <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.fullname }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">เลือกอาจารย์ที่ปรึกษาร่วม (ถ้ามี)</label>
          <select v-model="coAdvisorId" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#1a1a40] transition-all">
            <option value="">-- ไม่มีอาจารย์ที่ปรึกษาร่วม --</option>
            <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.fullname }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">เลือกเพื่อนร่วมกลุ่ม (ถ้ามี)</label>
          <select v-model="selectedStudentId" class="w-full bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 transition-all font-bold">
            <option value="">-- ทำโครงงานคนเดียว --</option>
            <option v-for="s in students" :key="s.id" :value="s.id">{{ s.fullname }} ({{ s.username }})</option>
          </select>
        </div>
      </div>
      <div v-else-if="isSubmitted && !isAdmin" class="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm animate-[fadeIn_0.5s_ease-out]">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-xl font-bold text-[#1a1a40]">รายการประวัติการยื่นเสนอหัวข้อ</h3>
            <p class="text-sm text-gray-500">ข้อมูลล่าสุดที่บันทึกไว้ในระบบ</p>
          </div>
          <div :class="project?.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'" class="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {{ project?.status === 'approved' ? 'อนุมัติแล้ว' : 'รอการพิจารณา' }}
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div class="w-14 h-14 rounded-2xl bg-white text-indigo-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
              <span class="material-symbols-rounded">title</span>
            </div>
            <div class="flex-grow">
              <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ชื่อโครงงาน (ภาษาไทย)</div>
              <div class="text-base font-bold text-[#1a1a40]">{{ project?.titleTh }}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div class="w-12 h-12 rounded-xl bg-white text-blue-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                <span class="material-symbols-rounded">person_pin</span>
              </div>
              <div>
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาหลัก</div>
                <div class="text-sm font-bold text-[#1a1a40]">{{ advisorName || '-' }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div class="w-12 h-12 rounded-xl bg-white text-emerald-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                <span class="material-symbols-rounded">group</span>
              </div>
              <div>
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาร่วม</div>
                <div class="text-sm font-bold text-[#1a1a40]">{{ coAdvisorName || '-' }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div class="w-14 h-14 rounded-2xl bg-white text-amber-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
              <span class="material-symbols-rounded">history</span>
            </div>
            <div class="flex-grow">
              <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ข้อมูลการบันทึกล่าสุด</div>
              <div class="text-sm font-bold text-[#1a1a40]">แก้ไขเมื่อ: {{ currentDate }}</div>
            </div>
            <button @click="printDocument" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1a1a40] text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-md">
              <span class="material-symbols-rounded text-base">print</span> พิมพ์ใบ CP1
            </button>
          </div>
        </div>
      </div>
      <div v-else class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center gap-3 text-indigo-600">
        <span class="material-symbols-rounded">info</span>
        <span class="text-sm font-bold">โหมดดูเอกสาร: ข้อมูลที่แสดงเป็นข้อมูลล่าสุดที่บันทึกในระบบ</span>
      </div>
    </div>

    <div class="flex flex-col items-center gap-8 print:block print:w-full print:gap-0" :class="isSubmitted ? 'pointer-events-none' : ''">
      
      <div class="paper-a4 page-break bg-white shadow-lg relative text-black text-[16px] leading-relaxed print:shadow-none">
        
        <div class="text-center mb-5">
          <img src="/bsru_logo.jpg" alt="BSRU Logo" class="w-[80px] mx-auto mb-1 print:w-[70px]">
          <h2 class="font-bold text-[18px]">แบบขออนุมัติหัวข้อโครงงานคอมพิวเตอร์</h2>
          <h3 class="font-bold text-[16px]">สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
          <h3 class="font-bold text-[16px]">มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา</h3>
        </div>

        <div class="flex items-end justify-end mb-4 gap-2 w-full">
          <span class="shrink-0">ภาคเรียนที่</span>
          <input type="text" v-model="form.semester" class="form-dotted text-center w-12 min-w-0">
          <span class="shrink-0 ml-2">ปีการศึกษา</span>
          <input type="text" v-model="form.academicYear" class="form-dotted text-center w-20 min-w-0">
        </div>

        <div class="flex items-end mb-5 gap-2 w-full">
          <span class="font-bold shrink-0">ชื่อเรื่อง (ภาษาไทย)</span>
          <input type="text" v-model="form.projectTitleTh" class="form-dotted flex-1 min-w-0">
        </div>

        <div class="mb-4">
          <div class="font-bold text-center mb-1">คนที่ 1</div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ชื่อนักศึกษา (นาย/นางสาว)</span>
            <input type="text" v-model="s1.fullname" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">รหัสนักศึกษา</span>
            <input type="text" v-model="s1.username" class="form-dotted w-32 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ที่อยู่ที่ติดต่อได้ เลขที่</span>
            <input type="text" v-model="s1.addressNo" class="form-dotted w-16 min-w-0 text-center">
            <span class="shrink-0">หมู่ที่</span>
            <input type="text" v-model="s1.moo" class="form-dotted w-12 min-w-0 text-center">
            <span class="shrink-0">ซอย</span>
            <input type="text" v-model="s1.soi" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">ถนน</span>
            <input type="text" v-model="s1.road" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ตำบล/แขวง</span>
            <input type="text" v-model="s1.subdistrict" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">อำเภอ/เขต</span>
            <input type="text" v-model="s1.district" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">จังหวัด</span>
            <input type="text" v-model="s1.province" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full relative">
            <span class="shrink-0">รหัสไปรษณีย์</span>
            <input 
              type="text" 
              v-model="s1.zipcode" 
              @input="handleZipcodeChange(1)"
              class="form-dotted w-24 min-w-0 text-center bg-[#fff9db] font-bold print:bg-transparent"
            >
            <!-- Suggestions Dropdown for S1 -->
            <div v-if="suggestions1.length > 0" class="absolute z-50 left-24 top-8 w-64 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto print:hidden">
              <div 
                v-for="(s, idx) in suggestions1" 
                :key="idx"
                @click="selectAddress(1, s)"
                class="p-2 hover:bg-gray-100 cursor-pointer text-xs border-b border-gray-100 last:border-0"
              >
                ต.{{ s.subdistrict }} อ.{{ s.district }} จ.{{ s.province }} {{ s.zipcode }}
              </div>
            </div>
            <span class="shrink-0">โทรศัพท์มือถือ</span>
            <input type="text" v-model="s1.tel" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">E-mail</span>
            <input type="email" v-model="s1.email" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">Line Id</span>
            <input type="text" v-model="s1.lineId" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">โทรศัพท์บ้าน</span>
            <input type="text" v-model="s1.homePhone" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">กรณีฉุกเฉิน ติดต่อ เบอร์โทร</span>
            <input type="text" v-model="s1.emergencyContact" class="form-dotted flex-1 min-w-0 text-center">
          </div>
        </div>

        <div class="mb-6">
          <div class="font-bold text-center mb-1">คนที่ 2 (ถ้ามี)</div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ชื่อนักศึกษา (นาย/นางสาว)</span>
            <input type="text" v-model="s2.fullname" class="form-dotted flex-1 min-w-0 text-center" placeholder="ปล่อยว่างหากทำคนเดียว">
            <span class="shrink-0">รหัสนักศึกษา</span>
            <input type="text" v-model="s2.username" class="form-dotted w-32 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ที่อยู่ที่ติดต่อได้ เลขที่</span>
            <input type="text" v-model="s2.addressNo" class="form-dotted w-16 min-w-0 text-center">
            <span class="shrink-0">หมู่ที่</span>
            <input type="text" v-model="s2.moo" class="form-dotted w-12 min-w-0 text-center">
            <span class="shrink-0">ซอย</span>
            <input type="text" v-model="s2.soi" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">ถนน</span>
            <input type="text" v-model="s2.road" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">ตำบล/แขวง</span>
            <input type="text" v-model="s2.subdistrict" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">อำเภอ/เขต</span>
            <input type="text" v-model="s2.district" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">จังหวัด</span>
            <input type="text" v-model="s2.province" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full relative">
            <span class="shrink-0">รหัสไปรษณีย์</span>
            <input 
              type="text" 
              v-model="s2.zipcode" 
              @input="handleZipcodeChange(2)"
              class="form-dotted w-24 min-w-0 text-center bg-[#fff9db] font-bold print:bg-transparent"
            >
            <!-- Suggestions Dropdown for S2 -->
            <div v-if="suggestions2.length > 0" class="absolute z-50 left-24 top-8 w-64 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto print:hidden">
              <div 
                v-for="(s, idx) in suggestions2" 
                :key="idx"
                @click="selectAddress(2, s)"
                class="p-2 hover:bg-gray-100 cursor-pointer text-xs border-b border-gray-100 last:border-0"
              >
                ต.{{ s.subdistrict }} อ.{{ s.district }} จ.{{ s.province }} {{ s.zipcode }}
              </div>
            </div>
            <span class="shrink-0">โทรศัพท์มือถือ</span>
            <input type="text" v-model="s2.tel" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">E-mail</span>
            <input type="email" v-model="s2.email" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">Line Id</span>
            <input type="text" v-model="s2.lineId" class="form-dotted flex-1 min-w-0 text-center">
            <span class="shrink-0">โทรศัพท์บ้าน</span>
            <input type="text" v-model="s2.homePhone" class="form-dotted flex-1 min-w-0 text-center">
          </div>
          
          <div class="flex items-end mb-1.5 gap-2 w-full">
            <span class="shrink-0">กรณีฉุกเฉิน ติดต่อ เบอร์โทร</span>
            <input type="text" v-model="s2.emergencyContact" class="form-dotted flex-1 min-w-0 text-center">
          </div>
        </div>

        <div class="flex justify-between px-8 mb-5 mt-6 w-full break-inside-avoid">
          <div class="flex flex-col items-center min-w-[250px]">
            <div class="flex items-end gap-2 w-full mb-1">
              <span class="shrink-0">ลงชื่อ</span>
              <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
              <span class="shrink-0">นักศึกษา</span>
            </div>
            <div class="flex items-end gap-1 w-full justify-center">
              <span class="shrink-0">(</span>
              <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700">{{ s1.fullname }}</span>
              <span class="shrink-0">)</span>
            </div>
          </div>
          
          <div class="flex flex-col items-center min-w-[250px]">
            <div class="flex items-end gap-2 w-full mb-1">
              <span class="shrink-0">ลงชื่อ</span>
              <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
              <span class="shrink-0">นักศึกษา</span>
            </div>
            <div class="flex items-end gap-1 w-full justify-center">
              <span class="shrink-0">(</span>
              <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700">{{ s2.fullname }}</span>
              <span class="shrink-0">)</span>
            </div>
          </div>
        </div>

        <div class="flex justify-center items-end gap-2 mb-6 w-full break-inside-avoid">
          <span class="shrink-0">วันที่</span>
          <input type="text" :value="currentDate" class="form-dotted w-[180px] min-w-0 text-center text-gray-600" readonly>
        </div>

        <div class="flex justify-between px-4 w-full break-inside-avoid">
          <div class="flex flex-col items-center min-w-[280px] mx-5">
            <div class="flex items-end gap-2 w-full mb-1">
              <span class="shrink-0">ลงชื่อ</span>
              <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
              <span class="shrink-0">ที่ปรึกษาหลัก</span>
            </div>
            <div class="flex items-end gap-1 w-full justify-center">
              <span class="shrink-0">(</span>
              <span class="form-dotted min-w-[180px] px-2 text-center text-gray-700">{{ advisorName }}</span>
              <span class="shrink-0">)</span>
            </div>
          </div>
          
          <div class="flex flex-col items-center min-w-[280px]">
            <div class="flex items-end gap-2 w-full mb-1">
              <span class="shrink-0">ลงชื่อ</span>
              <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
              <span class="shrink-0">ที่ปรึกษาร่วม</span>
            </div>
            <div class="flex items-end gap-1 w-full justify-center">
              <span class="shrink-0">(</span>
              <span class="form-dotted min-w-[180px] px-2 text-center text-gray-700">{{ coAdvisorName }}</span>
              <span class="shrink-0">)</span>
            </div>
          </div>
        </div>

      </div>

      <div class="paper-a4 bg-white shadow-lg relative text-black text-[16px] leading-relaxed flex flex-col justify-between print:shadow-none">
        
        <div>
          <div class="text-right mb-4 text-sm font-bold">CP-1</div>

          <div class="border-[1.5px] border-black p-6 mb-12">
            <h3 class="font-bold text-center mb-6 text-[18px]">ความเห็นของคณะกรรมการสอบหัวข้อโครงงานคอมพิวเตอร์</h3>
            
            <div class="flex flex-col gap-3 mb-6 pl-4">
              <div class="flex items-center gap-4">
                <div class="w-5 h-5 border-[1.5px] border-black shrink-0"></div>
                <span>อนุมัติ</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-5 h-5 border-[1.5px] border-black shrink-0"></div>
                <span>ไม่อนุมัติ</span>
              </div>
            </div>

            <div class="mb-2 pl-4">หมายเหตุเพิ่มเติม</div>
            <div class="border-b-[1.5px] border-dotted border-black h-8 w-full mb-2"></div>
            <div class="border-b-[1.5px] border-dotted border-black h-8 w-full mb-2"></div>
            <div class="border-b-[1.5px] border-dotted border-black h-8 w-full mb-2"></div>
            <div class="border-b-[1.5px] border-dotted border-black h-8 w-full"></div>
          </div>

          <div class="grid grid-cols-2 gap-y-10 px-4 mb-8">
            <div v-for="i in 6" :key="i" class="flex flex-col items-center break-inside-avoid">
              <div class="flex items-end gap-2 w-[250px] mb-1">
                <span class="shrink-0">ลงชื่อ</span>
                <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                <span class="shrink-0">กรรมการ</span>
              </div>
              <div class="text-center w-[250px] text-gray-500">(........................................................)</div>
            </div>
          </div>
        </div>

        <div class="mt-auto break-inside-avoid">
          <hr class="border-black mb-4 border-[1px]">
          <div class="flex gap-4">
            <span class="font-bold shrink-0">หมายเหตุ</span>
            <div>
              <p>1. กรุณาแนบบทที่ 1 มาพร้อมกับเอกสารชุดนี้</p>
              <p>2. ให้นำส่งที่ อ.ธีรพัฒน์ ณ ห้อง 412 อาคาร 4 ชั้น 1 สาขาวิชาวิทยาการคอมพิวเตอร์</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'student'
})

useHead({
  title: 'แบบขออนุมัติหัวข้อโครงงาน (CP1)',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap' }
  ]
})

const userCookie = useCookie('user_session')
const user = userCookie.value
const route = useRoute()
const projectIdParam = route.query.projectId
const isAdmin = computed(() => user?.role === 'admin' || user?.role === 'teacher')
const submitting = ref(false)

// ข้อมูลอาจารย์
const { data: teachersResult } = await useFetch('/api/admin/teachers')
const teachers = computed(() => teachersResult.value?.teachers || [])
const advisorId = ref('')
const coAdvisorId = ref('')

// ข้อมูลนักศึกษาสำหรับเลือกเพื่อนร่วมกลุ่ม
const { data: studentsResult } = await useFetch('/api/student/list-students')
const students = computed(() => studentsResult.value?.students || [])
const selectedStudentId = ref('')

const advisorName = computed(() => teachers.value.find(t => t.id === advisorId.value)?.fullname || '')
const coAdvisorName = computed(() => teachers.value.find(t => t.id === coAdvisorId.value)?.fullname || '')

// เมื่อเลือกเพื่อนร่วมกลุ่ม ให้เติมข้อมูล s2 อัตโนมัติ
watch(selectedStudentId, (newId) => {
  if (newId) {
    const student = students.value.find(s => s.id === newId)
    if (student) {
      Object.assign(s2, student)
    }
  } else {
    // ล้างข้อมูลถ้าไม่ได้เลือกใคร
    Object.keys(s2).forEach(key => s2[key] = '')
  }
})

const currentDate = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })

const form = reactive({ 
  semester: '1', 
  academicYear: user?.academicYear || '2568', 
  projectTitleTh: '',
  projectTitleEn: ''
})

const s1 = reactive({
  id: user?.id,
  username: user?.username || '',
  fullname: user?.fullname || '',
  email: user?.email || '',
  tel: user?.tel || '',
  lineId: user?.lineId || '',
  addressNo: user?.addressNo || '',
  moo: user?.moo || '',
  soi: user?.soi || '',
  road: user?.road || '',
  subdistrict: user?.subdistrict || '',
  district: user?.district || '',
  province: user?.province || '',
  zipcode: user?.zipcode || '',
  homePhone: user?.homePhone || '',
  emergencyContact: user?.emergencyContact || ''
})

const s2 = reactive({
  username: '',
  fullname: '',
  email: '',
  tel: '',
  lineId: '',
  addressNo: '',
  moo: '',
  soi: '',
  road: '',
  subdistrict: '',
  district: '',
  province: '',
  zipcode: '',
  homePhone: '',
  emergencyContact: ''
})

// Address Auto-fill logic
import { getProvinces, getDistricts, getSubdistricts } from '~/utils/thaiAddress'
import { getDataForZipCode } from 'thai-data'

const suggestions1 = ref([])
const suggestions2 = ref([])

const handleZipcodeChange = (num) => {
  const code = num === 1 ? s1.zipcode : s2.zipcode
  if (code.length === 5) {
    const data = getDataForZipCode(code)
    if (data) {
      // If found, we can show suggestions or just take the first one?
      // Thai-data returns a list of subdistricts for a zip code.
      if (num === 1) suggestions1.value = data.subDistrictList.map(s => ({
        subdistrict: s.subDistrictName,
        district: data.districtList.find(d => d.districtId === s.districtId)?.districtName || '',
        province: data.provinceList.find(p => p.provinceId === s.provinceId)?.provinceName || '',
        zipcode: data.zipCode
      }))
      else suggestions2.value = data.subDistrictList.map(s => ({
        subdistrict: s.subDistrictName,
        district: data.districtList.find(d => d.districtId === s.districtId)?.districtName || '',
        province: data.provinceList.find(p => p.provinceId === s.provinceId)?.provinceName || '',
        zipcode: data.zipCode
      }))
    }
  } else {
    if (num === 1) suggestions1.value = []
    else suggestions2.value = []
  }
}

const selectAddress = (num, addr) => {
  const target = num === 1 ? s1 : s2
  target.subdistrict = addr.subdistrict
  target.district = addr.district
  target.province = addr.province
  target.zipcode = addr.zipcode
  if (num === 1) suggestions1.value = []
  else suggestions2.value = []
}

const printDocument = () => window.print()

const { success: alertSuccess, error: alertError, confirm: alertConfirm, toast: alertToast } = useAlerts()

// ดึงข้อมูลโครงงาน
const fetchUrl = (isAdmin.value && projectIdParam) ? '/api/admin/project-detail' : '/api/student/my-project'
const fetchQuery = (isAdmin.value && projectIdParam) ? { id: projectIdParam } : undefined

const { data: projectData } = await useFetch(fetchUrl, {
  query: fetchQuery
})
const project = computed(() => projectData.value?.project)
const isSubmitted = computed(() => project.value && project.value.step >= 1 && (project.value.status === 'pending' || project.value.status === 'approved'))

watchEffect(() => {
  if (project.value) {
    form.semester = project.value.semester || '1'
    form.academicYear = project.value.academicYear || '2568'
    form.projectTitleTh = project.value.titleTh || ''
    form.projectTitleEn = project.value.titleEn || ''
    
    advisorId.value = project.value.advisorId || ''
    coAdvisorId.value = project.value.coAdvisorId || ''

    // จัดการข้อมูลนักศึกษาให้ถูกต้องตามลำดับในฐานข้อมูล
    if (project.value.student1) {
      Object.assign(s1, project.value.student1)
    }
    if (project.value.student2) {
      Object.assign(s2, project.value.student2)
    } else {
      // ล้างข้อมูล s2 หากไม่มีเพื่อนร่วมกลุ่ม
      s2.username = ''
      s2.fullname = ''
      s2.email = ''
      s2.tel = ''
    }
  }
})

const handleSubmit = async () => {
  if (!form.projectTitleTh) return alertToast('กรุณาระบุชื่อโครงงาน', 'warning')
  if (!advisorId.value) return alertToast('กรุณาเลือกอาจารย์ที่ปรึกษา', 'warning')
  
  const result = await alertConfirm('ยืนยันการยื่นขออนุมัติ', 'คุณต้องการยื่นขออนุมัติหัวข้อโครงงานใช่หรือไม่?')
  if (!result.isConfirmed) return

  submitting.value = true
  try {
    const response = await $fetch('/api/student/submit-cp1', {
      method: 'POST',
      body: {
        titleTh: form.projectTitleTh,
        titleEn: form.projectTitleEn,
        semester: form.semester,
        academicYear: form.academicYear,
        student1: s1,
        student2: s2.username ? s2 : null,
        advisorId: advisorId.value,
        coAdvisorId: coAdvisorId.value
      }
    })

    if (response.success) {
      await alertSuccess('สำเร็จ', 'ยื่นขออนุมัติเรียบร้อยแล้ว! ระบบจะนำคุณกลับหน้าหลัก')
      navigateTo('/student')
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* ================= CSS สำหรับฟอร์ม (หน้าจอ) ================= */
.paper-a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 12mm 15mm; /* ลด Padding ลงเพื่อให้เนื้อหาพอดี 1 หน้า */
  box-sizing: border-box;
  margin: 0 auto;
}

.form-dotted {
  border: none;
  border-bottom: 1.5px dotted #000;
  background-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  font-family: 'Sarabun', sans-serif;
  color: #1a1a40;
  border-radius: 0;
  line-height: 1.2;
  padding-bottom: 2px;
}

/* ================= CSS สำหรับสั่ง Print ================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 0cm; /* ตั้งค่าขอบกระดาษเป็น 0 ป้องกันเบราว์เซอร์แทรก Footer */
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .paper-a4 {
    width: 210mm !important; /* บังคับกว้างเท่า A4 */
    height: 297mm !important; /* บังคับสูงเท่า A4 */
    margin: 0 !important;
    padding: 10mm 15mm !important; /* ขยับขอบให้เนื้อหาฟิตพอดีตอนปริ้น */
    border: none !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    overflow: hidden; /* ห้ามล้นเด็ดขาด */
  }
  
  .page-break {
    page-break-after: always !important;
    break-after: page !important;
  }

  .break-inside-avoid {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .form-dotted {
    border-bottom: 1px dotted #000 !important;
    color: #000 !important;
  }
}
</style>
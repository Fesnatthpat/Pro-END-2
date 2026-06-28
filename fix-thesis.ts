import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Fixing Project 31 thesisUrl...')
  
  // Find the latest thesis report for Project 31
  const report = await prisma.progressReport.findFirst({
    where: { 
      projectId: 31,
      reportType: 'thesis'
    },
    orderBy: { createdAt: 'desc' }
  })

  if (report && report.fileUrl) {
    console.log(`Found fileUrl: ${report.fileUrl}`)
    
    // Update the Project record
    await prisma.project.update({
      where: { id: 31 },
      data: { thesisUrl: report.fileUrl }
    })
    
    console.log('Project 31 updated successfully!')
  } else {
    console.log('No thesis report found for Project 31 or fileUrl is missing.')
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
